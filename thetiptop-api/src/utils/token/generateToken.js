const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWTTOKEN_SECRET_KEY,
    { expiresIn: '24h'},
  );
}

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1y' },
  );
}
