const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');
const artifactRoutes = require('./routes/artifacts');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', activityRoutes);
app.use('/api', artifactRoutes);

app.get('/', (req, res) => {
  res.send('User Activity API');
});

sequelize.sync().then(() => {
  console.log('Database connected');
});

module.exports = app;