# 🏥 Plataforma de Apoio à Saúde para Idosos

Este é um sistema web desenvolvido com o objetivo de **facilitar o acesso de pessoas idosas às unidades de saúde**. A plataforma permite consultar hospitais com base nos **serviços oferecidos**, visualizar seus **endereços e localização no Google Maps**, e conta com um **painel administrativo** para o gerenciamento dessas unidades.

## 💡 Objetivo

Criar uma ferramenta digital simples, acessível e útil que ajude idosos e seus cuidadores a:

* Encontrar hospitais próximos com base em serviços de saúde (consultas, exames, urgência, etc.).
* Visualizar a localização no mapa.
* Oferecer um painel de cadastro e gestão para administradores da saúde.

---

## 🚀 Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript puro
* **Backend:** Node.js com Express
* **Banco de Dados:** MongoDB (Atlas)
* **Hospedagem (sugestão):** Vercel (frontend), Render / Railway / Heroku (backend)

---

## 📦 Instalação e Execução Local

### 🔧 Pré-requisitos

* [Node.js](https://nodejs.org/) instalado
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (ou instância local)
* Navegador atualizado (Chrome, Firefox, etc.)

---

### 🗂️ Clone o repositório

```bash
git clone https://github.com/seuusuario/sua-repo.git
cd sua-repo
```

---

### 📁 Estrutura do Projeto

```
support-platform-for-the-elderly/
├── backend/
│   └── models/
│   └── routes/
│   └── server.js
├── frontend/
│   └── assets/
│   └── css/
│   └── img/
│   └── pages/
│   │   ├── index.html
│   │   ├── hospital.html
│   │   ├── pagina-usuario.html
│   │   ├── cadastro-usuario-novo.html
│   │   └── registro-usuario-login.html
│   └── js/
│       ├── usuario.js
│       ├── cadastro.js
│       └── registro.js
```

---

### 📥 Instale as dependências

```bash
cd backend
npm install express cors mongodb bcrypt
```

---

### ⚙️ Configure o MongoDB Atlas

No arquivo `server.js`, atualize a conexão com sua string MongoDB:

```js
const uri = "mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/?retryWrites=true&w=majority";
```

---

### ▶️ Inicie o servidor

```bash
node server.js
```

Servidor rodará em:
`http://localhost:3000`

---

### 🌐 Acesse a interface

Abra o `index.html` com seu navegador (recomenda-se um servidor local para frontend, como Live Server no VSCode).

---

## 👤 Login Administrativo

Administrações podem:

* Cadastrar novos usuários.
* Fazer login via `login` + `senha`.
* Adicionar novos hospitais e seus serviços.

---

## 📌 Funcionalidades

* 🔎 Buscar hospitais por serviço oferecido
* 📍 Visualizar no Google Maps
* 🧾 Cadastro de novos hospitais
* 🔐 Área de login para administradores

---

## 👵 Acessibilidade

O site foi pensado para ser:

* 📱 Responsivo
* 🅰️ Legível com fontes grandes
* 👆 Navegável com poucos cliques
* 🗺️ Direcionado à praticidade do uso por idosos

---

## ✨ Contribuição

Contribuições são bem-vindas! Envie pull requests ou abra issues com sugestões.

---

## 🛡️ Licença

Este projeto é livre para fins educacionais. Licença MIT.

