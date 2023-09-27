const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');

router.post('/register', controller.register);

router.get('/', controller.findAll);

module.exports = router;