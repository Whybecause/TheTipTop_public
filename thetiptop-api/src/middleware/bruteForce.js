const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //Block for 15 minutes
  max: 5, //Allow each IP to 5 requests per window
  message: 'Trop de requêtes effectuées depuis cet IP, veuillez réessayer plus tard',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { limiter };
