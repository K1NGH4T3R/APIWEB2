const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function cleanDB() {
  try {
    const models = Object.values(sequelize.models);

    await sequelize.query('PRAGMA foreign_keys = OFF', { type: QueryTypes.RAW });

    for (let model of models) {
      await model.destroy({ where: {}, truncate: true });
    }

    await sequelize.query('PRAGMA foreign_keys = ON', { type: QueryTypes.RAW });

    console.log('Banco de dados limpo com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  }
}

module.exports = {
  cleanDB
};