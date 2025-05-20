// ======== Variáveis e elementos da página ===========
const inputUserId = document.getElementById("loginUserId");
const inputSenha = document.getElementById("loginSenha");
const mensagem = document.getElementById("mensagemLogin");

// ========== Função principal de login ===========
function fazerLogin() {
  
  // Evita que o formulário recarregue a página ao clicar em "Entrar"
  event.preventDefault();

  // Pega os valores digitados nos campos de login
  const userId = inputUserId.value.trim();
  const senha = inputSenha.value;

  // Verifica se os campos foram preenchidos
  if (userId === "" || senha === "") {
    mensagem.style.color = "red";
    mensagem.innerText = "Preencha todos os campos!";
    return;
  }

  // Busca os dados salvos no localStorage com base no userId
  const dadosUsuario = localStorage.getItem("usuario_" + userId);

  // Se não encontrar dados, o usuário não existe
  if (!dadosUsuario) {
    mensagem.style.color = "red";
    mensagem.innerText = "Usuário não encontrado.";
    return;
  }

  // Converte os dados de texto (JSON) para objeto novamente
  const usuario = JSON.parse(dadosUsuario);

  // Verifica se a senha está correta
  if (usuario.senha === senha) {
    mensagem.style.color = "green";
    mensagem.innerText = "Login realizado com sucesso!";

    // Redireciona para a página principal após o login
    setTimeout(() => {
      window.location.href = "pagina-usuario.html";
    }, 1000);
  } else {
    mensagem.style.color = "red";
    mensagem.innerText = "Senha incorreta.";
  }
}
