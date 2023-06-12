var express = require('express');
const { transporter } = require('../utils/transporter');
var router = express.Router();

const MAIL_TYPES = {
  contact: (data) => {
    return {
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `Message de ${data.name} depuis le formulaire de contact`,
      html: `
      <h1>Message de ${data.name} - ${data.email}</h1>
      <p>${data.message}</p>
      `,
    }
  },
}
router.post('/', async (req, res) => {
  const { mailType, data } = req.body || {};

  try {
    await transporter.sendMail(MAIL_TYPES[mailType](data));

    return res.status(200).json({
      success: true,
      content: 'Votre message a été envoyé',
    });
  } catch (error) {
    return res.status(400).json({
      success : false,
      content: 'Impossible d\'envoyer le message, veuillez réessayez plus tard',
    });
  }
});

module.exports = router;
