const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');
const { sequelize } = require('./models');
const routes = require('./routes/router');


const secretKey = 'cyno'; 
const app = express();

app.use('/api', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', authenticateToken);


app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
  res.send('API LIGADA');
});

app.post('/shutdown', (req, res) => {
    res.send('desligando o servidor...');
    setTimeout(() => {
        console.log(`servidor desligado`);
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