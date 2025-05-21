const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Certifique-se de que o controller está correto

// Rota para cadastrar admin
router.post('/cadastrar', adminController.cadastrarAdmin);

// Rota para login de admin
router.post('/login', adminController.loginAdmin);

module.exports = router;
