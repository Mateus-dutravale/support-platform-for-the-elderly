// document.getElementById("btnNovoHospital").addEventListener("click", () => {
//   document.getElementById("formHospital").classList.remove("oculto");
// });

// document.getElementById("cancelarEdicao").addEventListener("click", () => {
//   document.getElementById("formHospital").classList.add("oculto");
// });

document.getElementById("hospitalForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeHospital").value;
  const endereco = document.getElementById("enderecoHospital").value;
  const telefone = document.getElementById("telefoneHospital").value;
  const servicosRaw = document.getElementById("servicosHospital").value;
  const mapsURL = document.getElementById("mapsURLHospital").value;

  const servicos = servicosRaw.split(",").map(s => s.trim());

  try {
    const response = await fetch("https://support-platform-for-the-elderly.onrender.com/api/hospitais/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, endereco, telefone, servicos, mapsURL }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Hospital cadastrado com sucesso!");
      document.getElementById("hospitalForm").reset();
      // document.getElementById("formHospital").classList.add("oculto");
      // Aqui você pode atualizar a tabela automaticamente se quiser
    } else {
      alert("Erro ao cadastrar hospital: " + result.error);
    }
  } catch (err) {
    console.error(err);
    alert("Erro na requisição");
  }
});
