const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');
const loginController=require('../controllers/loginController');
const editarPerfil = require('../controllers/editarperfilController');

// Rutas de autenticación
router.post('/register', registroController);
router.post('/login', loginController);
router.post('/editarperfil', editarPerfil);

module.exports = router;
