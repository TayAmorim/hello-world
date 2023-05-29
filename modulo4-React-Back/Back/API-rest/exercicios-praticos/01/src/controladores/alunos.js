let { alunos, idAluno } = require("../bancodedados");

const listarAlunos = (req, res) => {
  res.json(alunos);
};

const listarIdAluno = (req, res) => {
  const { id } = req.params;

  const alunoPesquisado = alunos.find((aluno) => aluno.id === Number(id));

  if (!alunoPesquisado) {
    return res.status(400).json({ mensagem: "Aluno não encontrado" });
  }

  return res.json(alunoPesquisado);
};

const cadastrarAluno = (req, res) => {
  const { nome, sobrenome, idade, curso } = req.body;

  const novoAluno = {
    id: idAluno++,
    nome,
    sobrenome,
    idade,
    curso,
  };
  alunos.push(novoAluno);
  return res.status(201).json(novoAluno);
};

module.exports = { listarAlunos, listarIdAluno, cadastrarAluno };
