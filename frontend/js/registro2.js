async function fazerLogin(e) {
    e.preventDefault();

    const login = document.getElementById("loginUserId").value;
    const password = document.getElementById("loginSenha").value;

    try {
        const resposta = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }),
        });

        const resultado = await resposta.json();

        const mensagem = document.getElementById("mensagemLogin");
        if (resposta.ok) {
            mensagem.textContent = "✅ Login bem-sucedido!";
            mensagem.style.color = "green";
            // Redirecionar se necessário: window.location.href = "/dashboard.html";
            window.location.href = "pagina-usuario.html";
        } else {
            mensagem.textContent = "❌ " + resultado.error;
            mensagem.style.color = "red";
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}
