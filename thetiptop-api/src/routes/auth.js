var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var randomString = require('random-string');
const { limiter } = require('../middleware/bruteForce');
const { transporter } = require('../utils/transporter');

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

var { User } = require('../Models');
const { generateAccessToken, generateRefreshToken } = require('../utils/token/generateToken');
var router = express.Router();

// REFRESH TOKEN FONCTIONNEMENT
// si user fait une requete en étant connecté avec un token expiré
// back: le authenticate middleware va retourner une 401
// front: le front va automatiquement envoyer une requete sur /refreshToken
// api: génère et renvoie un nouveau token
// front: remplace l'ancien token par le nouveau
router.post('/refreshToken', async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken == null) {
    return res.status(400).json({
      success: false,
      content: 'Bad Parameter: Missing refresh token',
    });
  }

  try {
    const decodedToken  = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const userId = decodedToken.userId;

    // Check that user still exists
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        content: 'User has been deleted'
      });
    }

    const refreshedToken = generateAccessToken(user);

    return res.status(200).json({
      success: true,
      content: refreshedToken,
    });
  } catch (error) {
    return res.status(400).json({
      success : false,
      content: error,
    })
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let content = 'Identifiants incorrects'

  if (email === undefined || password === undefined) {
    return res.status(400).json({
      success: false,
      content
    })
  }

  const user = await User.findOne({
    where : {
      email: req.body.email
    }
  });

  // As we don't allow password with null values
  // But we don't have password for users authenticated with google
  // So we store a default password but prevent to login with classic form
  // when it's a google account
  if (!user || user.password === 'google') {
    return res.status(404).json({
      success: false,
      content
    })
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        content: 'Problem with the server, try again later',
        err: err,
        result: result
      })
    }

    if (result != true) {
      return res.status(400).json({
        success: false,
        content
      });
    }

    // Don't send password to front
    delete user.dataValues.password;

    return res.status(200).json({
      success: true,
      content: {
        ...user.dataValues,
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      }
    });
  })
});

router.post('/auth/google', async (req, res) => {
  const { tokenId, googleId } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, given_name, family_name, email, picture } = ticket.getPayload();

  const user = await User.findOne({
    where: { email: email}
  });

  if (user) {
    const updatedUser = await user.update({
      username: name,
      firstName: given_name,
      lastName: family_name,
      picture
    });

    // Don't send password to client
    delete updatedUser.dataValues.password;

    return res.status(200).json({
      success: true,
      content: {
        ...updatedUser.dataValues,
        accessToken: generateAccessToken(updatedUser.dataValues),
        refreshToken: generateRefreshToken(updatedUser.dataValues),
      },
    });
  }

  const newUser = await User.create({
    googleId,
    username: name,
    firstName: given_name,
    lastName: family_name,
    email,
    picture,
    password: 'google',
  });

  // Don't send password to client
  delete newUser.dataValues.password;

  return res.status(200).json({
    success: true,
    content: {
      ...newUser.dataValues,
      accessToken: generateAccessToken(newUser),
      refreshToken: generateRefreshToken(newUser),
    }
  });
});

router.post('/password/reset-link', limiter, async (req, res) => {
  const { email } = req.body || {};

  try {
    const existingUser = await User.findOne({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        content: 'Email incorrect',
      });
    }

    if (existingUser.googleId !== null) {
      return res.status(403).json({
        success: false,
        content: 'Connectez vous avec Google'
      });
    }

    const resetPasswordToken = randomString({ length: 28, hex: true });

    await existingUser.update({
      resetPasswordToken,
      resetPasswordExpires: Date.now() + 3600000 //1 hour
    });


    const html = `
      <h1>
        Votre demande de réinitialisation de mot de passe.
      </h1>
      <div>Cliquez sur le lien ci-dessous pour changer votre mot de passe :
        <a href="http://${process.env.CLIENT_URL}/reset-password?token=${resetPasswordToken}">Reset</a>
      </div>`;

    const subject = "Réinitialisation de votre mot de passe";
    const mailData = {
      from: process.env.CONTACT_EMAIL,
      to: email,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailData);

    return res.status(200).json({
      success: true,
      content: `Un lien de réinitialisation a été envoyé à ${email} (vérifiez vos spams)`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});


router.patch('/password/reset', async (req, res) => {
  const { newPassword, passwordConfirm, token } = req.body;

  try {
    if (!newPassword || !passwordConfirm || !token) {
      return res.status(400).json({
        success: false,
        content: 'Bad Parameter Error',
      });
    }

    if (newPassword !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        content: 'Les mots de passe ne sont pas identiques',
      });
    }

    const user = await User.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        content: 'Ce lien n\est pas valide',
      });
    }

    if (user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        success: false,
        content: 'Ce lien a expiré, demandez en un nouveau'
      })
    };

    bcrypt.hash(newPassword, Number(process.env.SALTROUNDS), async (err, hash) => {
      if (err) {
        return res.status(500).json({
          success: false,
          content: err,
          msg: 'Could not hash password'
        });
      }

      await user.update({
        password: hash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
       });

      return res.status(200).json({
        success: true,
        content: 'Votre mot de passe a été changé, connectez-vous',
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});


module.exports = router;
