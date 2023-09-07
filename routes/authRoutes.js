const express = require('express');
const { registerController } = require('../controllers/authController');

const router = express.router()

router.post('/register',registerController)

module.exports = router