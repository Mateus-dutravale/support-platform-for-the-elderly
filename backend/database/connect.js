const mongoose = require('mongoose');

// Conexão com MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:trilhas@cluster0.1mg08br.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
