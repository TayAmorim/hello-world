const pool = require("../conexao");

const cadastrarPOkemon = async (req, res) => {
  const { nome, habilidades, imagem, apelido } = req.body;
  const { id } = req.usuario;

  try {
    const query =
      "insert into pokemons (usuario_id, nome, habilidades, imagem, apelido) values ($1, $2, $3, $4, $5) returning *";
    const params = [id, nome, habilidades, imagem, apelido];
    const novoPokemon = await pool.query(query, params);
    res.status(201).json(novoPokemon.rows[0]);
  } catch (error) {
    res.status(error.status).json({ message: `${error?.message}` });
  }
};

const atualizatApelido = async (req, res) => {
  const { id } = req.params;
  const { apelido } = req.body;

  try {
    const pokemonExiste = await pool.query(
      "select * from pokemons where id = $1",
      [id]
    );
    if (pokemonExiste.rowCount < 1) {
      return res.status(404).json({ message: "Pokemon não existe" });
    }
    const atualizarApelido = await pool.query(
      "update pokemons set apelido = $1 where id = $2 returning *",
      [apelido, id]
    );
    return res.status(201).json(atualizarApelido.rows[0]);
  } catch (error) {
    res.status(500).json({ message: `${error?.message}` });
  }
};

module.exports = {
  cadastrarPOkemon,
  atualizatApelido,
};
