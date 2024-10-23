const { signup, login, forgotPass } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotPassValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/forgot-pass', forgotPassValidation, forgotPass)

module.exports = router;