document.getElementById("formInscricao").addEventListener("submit", async (e) => {
    e.preventDefault();

    const cpfInput = document.getElementById("cpf");
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

    const cpf = cpfInput.value.trim();
    // Validação do CPF
    if (!validarCPF(cpf)) {
        mensagem.style.color = "red";
        mensagem.innerText = "CPF inválido. Use um CPF válido: 173.456.789-11";
        return;
    }

    const usuario = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        // cpf: document.getElementById("cpf").value,
        cpf: cpf,
        funcao_cargo: document.getElementById("cargo").value,
        login: document.getElementById("userId").value,
        password: document.getElementById("senha").value,
    };

    try {
        const resposta = await fetch("http://localhost:3000/api/usuarios/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });

        const resultado = await resposta.json();

        const mensagem = document.getElementById("mensagemLogin");
        if (resposta.ok) {
            mensagem.textContent = "✅ Cadastro realizado com sucesso!";
            mensagem.style.color = "green";
            window.location.href = "registro-usuario-login.html";
        } else {
            mensagem.textContent = "❌ " + resultado.error;
            mensagem.style.color = "red";
        }
    } catch (error) {
        console.error("Erro:", error);
    }
});
