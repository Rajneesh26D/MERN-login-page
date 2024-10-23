const rateLimit = require('express-rate-limit');

// Limit to 5 login attempts per 15 minutes from the same IP
const loginRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  headers: true, // Optional: Include rate limit headers in response
});

module.exports = { loginRateLimiter };
