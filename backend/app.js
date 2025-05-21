const express = require('express');
const app = express();
const connectDB = require('./database/connect');
const adminRoutes = require('./routes/adminRoutes');
const unidadeSaudeRoutes = require('./routes/unidadeSaudeRoutes');

// Conectar ao banco de dados
connectDB();

// Middleware para lidar com JSON
app.use(express.json());

// Usar as rotas
app.use('/api/admin', adminRoutes);  // Rota para admin
app.use('/api/unidades', unidadeSaudeRoutes); // Rota para unidades de saúde

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
