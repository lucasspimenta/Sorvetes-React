const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./src/index');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

router(app);

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
