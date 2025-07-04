const db = require('./sorvete');

exports.get = async (req, res) => {
  try {
    const con = await db.connect();
    const [rows] = await con.query('SELECT * FROM sorvete');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar sorvetes:', error);
    res.status(500).json({ error: 'Erro ao listar sorvetes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await db.connect();
    const [rows] = await con.query('SELECT * FROM sorvete WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Sorvete não encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar sorvete:', error);
    res.status(500).json({ error: 'Erro ao buscar sorvete' });
  }
};

exports.post = async (req, res) => {
  const { sabor, preco, tipo, disponivel, descricao } = req.body;

  try {
    const con = await db.connect();
    const sql = 'INSERT INTO sorvete (sabor, preco, tipo, disponivel, descricao) VALUES (?, ?, ?, ?, ?)';
    const values = [sabor, preco, tipo, disponivel, descricao];
    const [result] = await con.query(sql, values);

    res.status(201).json({ id: result.insertId, sabor, preco, tipo, disponivel, descricao });
  } catch (error) {
    console.error('Erro ao inserir sorvete:', error);
    res.status(500).json({ error: 'Erro ao inserir sorvete' });
  }
};

exports.put = async (req, res) => {
  const id = req.params.id;
  const { sabor, preco, tipo, disponivel, descricao } = req.body;

  try {
    const con = await db.connect();
    const sql = 'UPDATE sorvete SET sabor = ?, preco = ?, tipo = ?, disponivel = ?, descricao = ? WHERE id = ?';
    const values = [sabor, preco, tipo, disponivel, descricao, id];
    await con.query(sql, values);

    res.status(200).json({ message: 'Sorvete atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar sorvete:', error);
    res.status(500).json({ error: 'Erro ao atualizar sorvete' });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const con = await db.connect();
    await con.query('DELETE FROM sorvete WHERE id = ?', [id]);
    res.status(200).json({ message: 'Sorvete removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover sorvete:', error);
    res.status(500).json({ error: 'Erro ao remover sorvete' });
  }
};
