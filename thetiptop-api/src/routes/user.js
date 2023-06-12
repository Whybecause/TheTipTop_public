const bcrypt = require('bcrypt');
var express = require('express');
var { User } = require('../Models');
const { authenticate } = require('../middleware/auth');
const { hasRole } = require('../middleware/hasRole');
const { generateAccessToken, generateRefreshToken } = require('../utils/token/generateToken');
var router = express.Router();

router.get('/', [authenticate, hasRole(['ADMIN', 'EMPLOYEE'])], async (req, res) => {
  try {
    let users = await User.findAll();
    res.json({
      success: true,
      content: users
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// Get a user infos
router.get('/:id', authenticate, async (req, res) => {
  const isAdmin = req.user.role === 'ADMIN' || req.user.role === 'EMPLOYEE';

  try {
    if (!Number.isInteger(Number(req.params.id))) {
    return res.status(400).json({
      success: false,
      content: `Bad Parameter ${req.params.id}`,
    });
  }

    if (req.user.id === Number(req.params.id) || isAdmin) {
      const user = await User.findByPk(req.params.id);

      if (user == null) {
        return res.status(404).json({
          success: false,
          content: 'Could not find a user',
        });
      }

      return res.json({
        success: true,
        content: user
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      acceptedNewsletter
    } = req.body;

    if (username === undefined || password === undefined || email === undefined || firstName === undefined || lastName === undefined) {
      return res.status(400).json({
        success: false,
        content: 'Missing required argument'
      });
    }

    const existingEmail = await User.findOne({
      where: { email: email }
    });

    if (existingEmail !== null) {
      return res.status(400).json({
        success: false,
        content: 'Email already exists'
      });
    }

    bcrypt.hash(password, Number(process.env.SALTROUNDS), async (err, hash) => {
      if (err) {
        return res.status(500).json({
          success: false,
          content: err,
          msg: 'Could not hash password'
        });
      }

      let user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password: hash,
        role: 'USER',
        acceptedNewsletter : acceptedNewsletter === undefined ? false : acceptedNewsletter,
      });

      // Don't send password to the client
      delete user.dataValues.password

      if (user) {
        res.status(201).json({
          success: true,
          content: {
            ...user.dataValues,
            accessToken: generateAccessToken(user),
            refreshToken: generateRefreshToken(user),
          },
        });
      }
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

router.patch('/:id', authenticate, async (req, res) => {
  const ALLOWED_INPUT = ['username', 'firstName', 'lastName', 'email', 'acceptedNewsletter', 'role'];

  try {
    const removeBadInputs = (data) => {
      const newData = {};
      Object.keys(data).forEach((key) => {
        if (ALLOWED_INPUT.includes(key)) newData[key] = data[key];
      });
      return newData;
    }

    removeBadInputs(req.body);

    const isAdmin = req.user.role === 'ADMIN';
    const isCurrentUser = req.user.id === Number(req.params.id);

    if (!isAdmin && !isCurrentUser) {
      return res.status(403).json({
        success: false,
        content: 'Vous n\'avez pas les droits nécessaires pour effectuer cette action'
      })
    }

    const user = await User.findByPk(req.params.id);

    // Only admin can change a role
    if (!isAdmin && req.body.role && user.role !== role) {
      return res.status(403).json({
        success: false,
        content: 'Vous n\'avez pas les droits nécessaires pour modifier le role'
      })
    }

    let result = await User.update(req.body, {
        where: { id: req.params.id }
    });


    if (result.includes(0)) {
      return res.status(404).json({
        success: false,
        content: `Could not find user with id ${req.params.id}`
      });
    }

    return res.status(200).json({
      success: true,
      content: req.body,
      message: 'Changements sauvegardés',
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// Delete all users with role = USER
router.delete('/', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    await User.destroy({
      where: { role: 'USER'},
      truncate: false,
    });

    return res.status(200).json({
      success: true,
      content: 'All user accounts with role USER have been deleted',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
})

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const isUser = req.user.id === Number(req.params.id);

    if (!isAdmin && !isUser) {
      return res.status(403).json({
        success: false,
        content: 'Vous n\'avez pas les droits nécessaires pour effectuer cette action'
      })
    }

    let deleted_id = await User.destroy({
      where: {
        id: req.params.id
      }
    })

    if (deleted_id === 0) {
      return res.status(404).json({
        success: false,
        content: `Could not find user with id ${req.params.id}`
      });
    }

    return res.status(200).json({
      success: true,
      content: {
        message: 'Compte supprimé',
        shouldLogout: isUser,
      }
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

module.exports = router;
