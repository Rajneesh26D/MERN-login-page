const { signup, login, forgotPass } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotPassValidation } = require('../Middlewares/AuthValidation');
const {loginRateLimiter} = require('../Middlewares/rateLimiter');

const router = require('express').Router();

// rate limiter to the login route and login validation
router.post('/login', loginRateLimiter, loginValidation, login);

router.post('/signup', signupValidation, signup);
router.post('/forgot-pass', forgotPassValidation, forgotPass);

module.exports = router;
