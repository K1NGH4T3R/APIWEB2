const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes/router');
const { cleanDB } = require('./controllers/cleanDB');

const app = express();
const secretKey = 'cyno'; 

// Middlewares de análise de corpo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas principais
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('API LIGADA');
});

app.post('/reset', async (req, res) => {
  try {
    await cleanDB();
    res.send('Database cleaned');
  } catch (error) {
    console.error('Error in /reset route:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/shutdown', (req, res) => {
  res.send('desligando o servidor...');
  setTimeout(() => {
    console.log('servidor desligado');
    res.end('Servidor desligado.');
    process.exit(0); 
  }, 1000);
});

sequelize.sync().then(() => {
  console.log('BANCO DE DADOS CONECTADO');
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

module.exports = app;
