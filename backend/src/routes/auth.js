const express = require('express');
const router = express.Router();
const { register, login, getMe, updateSettings } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin, checkValidation } = require('../middleware/validation');

router.post('/register', validateRegister, checkValidation, register);
router.post('/login', validateLogin, checkValidation, login);
router.get('/me', protect, getMe);
router.put('/settings', protect, updateSettings);

module.exports = router;
