const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true // Garantindo que o login seja único
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  funcao: {
    type: String,
    required: true
  },
  cpf: {
    type: String,  // Certifique-se de que o cpf é uma string
    required: true,
    unique: true // Se você precisar garantir que o CPF seja único
  }
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
