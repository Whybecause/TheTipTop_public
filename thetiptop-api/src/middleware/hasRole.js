function hasRole(roles) {
  return async function(req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        content: 'Unauthorized',
      });
    }
    return next();
  }
}

module.exports = { hasRole };
