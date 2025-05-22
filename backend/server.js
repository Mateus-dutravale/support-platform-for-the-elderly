const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;


const corsOptions = {
  origin: ["https://support-platform-for-the-elderly-qbhj.vercel.app/"], 
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const client = new MongoClient(uri);
let db = null;

async function connectToDatabase() {
  if (db) return db;
  await client.connect();
  db = client.db("infosaude");
  return db;
}

// Adicionar hospital
app.post("/api/hospitais/add", async (req, res) => {
  const { nome, endereco, telefone, servicos, mapsURL } = req.body;

  if (!nome || !endereco || !telefone || !servicos || !mapsURL) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const db = await connectToDatabase();
    const col = db.collection("unidades_de_saude");

    await col.insertOne({ nome, endereco, telefone, servicos, mapsURL });

    res.status(201).json({ message: "Hospital cadastrado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar hospitais por exame
app.get("/api/hospitais/get", async (req, res) => {
  const exame = req.query.exame;
  if (!exame) return res.status(400).json({ error: "Exame não informado" });

  try {
    const db = await connectToDatabase();
    const col = db.collection("unidades_de_saude");

    const query = { servicos: exame };
    const projection = { projection: { nome: 1, endereco: 1, servicos: 1, mapsURL: 1, _id: 0 } };

    const resultados = await col.find(query, projection).toArray();
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cadastro de usuário
app.post("/api/usuarios/cadastrar", async (req, res) => {
  const { nome, sobrenome, funcao_cargo, login, password, cpf } = req.body;

  if (!nome || !sobrenome || !cpf || !funcao_cargo || !login || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const db = await connectToDatabase();
    const col = db.collection("usuarios_admin");

    const existe = await col.findOne({ login });
    if (existe) return res.status(409).json({ error: "Login já cadastrado" });

    const senhaHash = await bcrypt.hash(password, 10);

    await col.insertOne({
      nome,
      sobrenome,
      cpf,
      funcao_cargo,
      login,
      password: senhaHash
    });

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login do usuário
app.post("/api/usuarios/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: "Login e senha são obrigatórios" });
  }

  try {
    const db = await connectToDatabase();
    const col = db.collection("usuarios_admin");

    const usuario = await col.findOne({ login });
    if (!usuario) return res.status(401).json({ error: "Credenciais inválidas" });

    const senhaConfere = await bcrypt.compare(password, usuario.password);
    if (!senhaConfere) return res.status(401).json({ error: "Login ou senha inválidos." });

    res.status(200).json({
      mensagem: "Login bem-sucedido",
      usuario: {
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        funcao_cargo: usuario.funcao_cargo,
        login: usuario.login
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
