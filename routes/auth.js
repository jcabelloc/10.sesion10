const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/ingresar', authController.getIngresar);

router.post('/ingresar', authController.postIngresar);


module.exports = router;