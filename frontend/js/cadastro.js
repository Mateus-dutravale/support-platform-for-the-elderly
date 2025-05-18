// Seleção dos elementos do formulário

const form = document.getElementById("formInscricao");
const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.querySelectorAll("#nome")[1]; // Segundo campo com id "nome"
const cpfInput = document.getElementById("cpf");
const cargoInput = document.getElementById("cargo");
const userIdInput = document.getElementById("userId");
const senhaInput = document.getElementById("senha");
const mensagem = document.getElementById("mensagemLogin");

// Aplica máscara de CPF enquanto o usuário digita
cpfInput.addEventListener("input", () => {
  let cpf = cpfInput.value.replace(/\D/g, ""); // Remove tudo que não for número

  // Aplica o padrão 000.000.000-00
  cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  cpfInput.value = cpf;
});

// Validação do CPF: checa se está no formato correto e não tem dígitos repetidos
function validarCPF(cpfString) {
  const cpf = cpfString.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // CPF com tamanho errado ou todos os dígitos iguais
  }

  const formatoValido = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!formatoValido.test(cpfString)) {
    return false;
  }

  return true;
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita que a página recarregue

  // Pegando os valores dos campos
  const nome = nomeInput.value.trim();
  const sobrenome = sobrenomeInput.value.trim();
  const cpf = cpfInput.value.trim();
  const cargo = cargoInput.value.trim();
  const userId = userIdInput.value.trim();
  const senha = senhaInput.value;

  // Validação do CPF
  if (!validarCPF(cpf)) {
    mensagem.style.color = "red";
    mensagem.innerText = "CPF inválido. Use um CPF válido: 173.456.789-11";
    return;
  }

  // Verifica se o usuário já existe no localStorage
  if (localStorage.getItem("usuario_" + userId)) {
    mensagem.style.color = "red";
    mensagem.innerText = "Usuário já cadastrado. Escolha outro login.";
    return;
  }

  // Cria objeto com os dados do novo usuário
  const novoUsuario = {
    nomeCompleto: nome + " " + sobrenome,
    cpf: cpf,
    cargo: cargo,
    userId: userId,
    senha: senha
  };

  // Salva o novo usuário no localStorage
  localStorage.setItem("usuario_" + userId, JSON.stringify(novoUsuario));

  // Mensagem de sucesso
  mensagem.style.color = "green";
  mensagem.innerText = "Cadastro realizado com sucesso! Redirecionando...";

  // Redireciona para a tela de login após 2 segundos
  setTimeout(() => {
    window.location.href = "registro-usuario-login.html";
  }, 5000);
});
