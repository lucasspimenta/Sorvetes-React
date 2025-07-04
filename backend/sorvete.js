const mysql = require('mysql2/promise');

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sorvetes'
  });

  global.connection = connection;
  console.log('MySQL conectado com sucesso!');
  return connection;
}

module.exports = { connect };
