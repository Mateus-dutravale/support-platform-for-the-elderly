const Admin = require('../models/Admin'); // Modelo de Admin

// Função para cadastrar um administrador
const cadastrarAdmin = async (req, res) => {
  try {
    const { login, senha, nome, funcao } = req.body;

    // Verifica se o admin já existe
    const adminExistente = await Admin.findOne({ login });
    if (adminExistente) {
      return res.status(400).json({ error: 'Administrador já cadastrado!' });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria um novo admin
    const novoAdmin = new Admin({
      login,
      senha: senhaCriptografada,
      nome,
      funcao
    });

    await novoAdmin.save(); // Salva o novo admin no banco

    res.status(201).json({ message: 'Administrador cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar administrador' });
  }
};

// Função para login de administrador
const loginAdmin = async (req, res) => {
  try {
    const { login, senha } = req.body;

    // Verifica se o administrador existe
    const admin = await Admin.findOne({ login });
    if (!admin) {
      return res.status(400).json({ error: 'Administrador não encontrado!' });
    }

    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, admin.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

module.exports = {
  cadastrarAdmin,
  loginAdmin
};
