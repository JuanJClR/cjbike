const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');
const loginController=require('../controllers/loginController');

// Rutas de autenticación
router.post('/register', registroController);
router.post('/login', loginController);

module.exports = router;
