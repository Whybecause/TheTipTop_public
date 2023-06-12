const { User } = require('../Models')
const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
  let content = 'Invalid request! Check authentication token'

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ content });
    }

    const decodedToken = jwt.verify(token, process.env.JWTTOKEN_SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      content = 'Invalid user ID';
      throw 'Invalid user ID';
    }

    req.user = user;
    return next();

  } catch {
    res.status(401).json({
      success: false,
      content: content
    });
  }
};

module.exports = { authenticate };
