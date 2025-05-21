import { buscarHospitaisComExame } from './scripts.js';

function gerarTemplateHTML(hospitais, exameBuscado) {
  return hospitais.map(hospital => {
    const { nome, endereco, servicos, mapsURL } = hospital;

    const outrosExames = servicos?.filter(exame => exame !== exameBuscado) || [];
    const examesTexto = outrosExames.length
      ? `${outrosExames.join(', ')}.`
      : 'Nenhum outro exame listado.';

    return `
      <div class="container">
        <div class="info">
          <h2>${nome}</h2>
          <p><strong>Endereço:</strong> ${endereco}</p>
          <p><strong>Exames disponíveis:</strong> ${examesTexto}</p>
        </div>
        <div class="mapa">
          <iframe 
            src="${mapsURL}"
            allowfullscreen="" loading="lazy">
          </iframe>
        </div>
      </div>
    `;
  }).join('\n');
}

function getParamExame() {
  const params = new URLSearchParams(window.location.search);
  return params.get('exame');
}

document.addEventListener('DOMContentLoaded', async () => {
  const exame = getParamExame();
  const container = document.querySelector('.buscarHospitais');

  if (!container) {
    console.error("⚠️ ERRO: Div com classe .buscarHospitais não encontrada no DOM.");
    return;
  }

  if (!exame) {
    container.innerHTML = '<p>Exame não informado na URL.</p>';
    return;
  }

  try {
    const hospitais = await buscarHospitaisComExame(exame);
    const html = gerarTemplateHTML(hospitais, exame);
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<p>Erro ao buscar hospitais: ${err.message}</p>`;
  }
});

