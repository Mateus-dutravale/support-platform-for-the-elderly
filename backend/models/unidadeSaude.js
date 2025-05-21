const mongoose = require('mongoose');

const unidadeSaudeSchema = new mongoose.Schema({
  unidade_saude: { type: String, required: true },
  endereco: { type: String, required: true },
  telefone: { type: String, required: true },
  servico_disponivel: { type: String, required: true }
});

module.exports = mongoose.model('UnidadeSaude', unidadeSaudeSchema);