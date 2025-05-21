const UnidadeSaude = require('../models/unidadeSaude'); // Modelo de Unidade de Saúde

// Função para cadastrar unidade de saúde
const cadastrarUnidadeSaude = async (req, res) => {
  try {
    const { unidade_saude, endereco, telefone, servico_disponivel } = req.body;

    // Cria uma nova unidade de saúde
    const novaUnidade = new UnidadeSaude({
      unidade_saude,
      endereco,
      telefone,
      servico_disponivel
    });

    await novaUnidade.save(); // Salva no banco de dados

    res.status(201).json({ message: 'Unidade de Saúde cadastrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar unidade de saúde' });
  }
};

// Função para listar todas as unidades de saúde
const listarUnidadesSaude = async (req, res) => {
  try {
    const unidades = await UnidadeSaude.find();
    res.status(200).json(unidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar unidades de saúde' });
  }
};

// Função para editar uma unidade de saúde
const editarUnidadeSaude = async (req, res) => {
  const { id } = req.params;
  const { unidade_saude, endereco, telefone, servico_disponivel } = req.body;

  try {
    const unidade = await UnidadeSaude.findByIdAndUpdate(
      id,
      { unidade_saude, endereco, telefone, servico_disponivel },
      { new: true }
    );

    if (!unidade) {
      return res.status(404).json({ error: 'Unidade de saúde não encontrada' });
    }

    res.status(200).json({ message: 'Unidade de saúde atualizada com sucesso!', unidade });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar unidade de saúde' });
  }
};

// Função para excluir uma unidade de saúde
const excluirUnidadeSaude = async (req, res) => {
  const { id } = req.params;

  try {
    const unidade = await UnidadeSaude.findByIdAndDelete(id);

    if (!unidade) {
      return res.status(404).json({ error: 'Unidade de saúde não encontrada' });
    }

    res.status(200).json({ message: 'Unidade de saúde excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir unidade de saúde' });
  }
};

module.exports = {
  cadastrarUnidadeSaude,
  listarUnidadesSaude,
  editarUnidadeSaude,
  excluirUnidadeSaude
};
