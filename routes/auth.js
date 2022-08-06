const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.store);

module.exports = router;