const express = require('express');
const router = express.Router();
const unidadeSaudeController = require('../controllers/unidadeSaudeController'); // Controller de unidade de saúde

// Rota para cadastrar unidade de saúde
router.post('/cadastrar', unidadeSaudeController.cadastrarUnidadeSaude);

// Rota para listar todas as unidades de saúde
router.get('/', unidadeSaudeController.listarUnidadesSaude);

// Rota para editar uma unidade de saúde
router.put('/editar/:id', unidadeSaudeController.editarUnidadeSaude);

// Rota para excluir uma unidade de saúde
router.delete('/excluir/:id', unidadeSaudeController.excluirUnidadeSaude);

module.exports = router;


