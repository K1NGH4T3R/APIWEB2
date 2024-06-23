const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function cleanDB() {
  try {
    const models = Object.values(sequelize.models);

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { type: QueryTypes.RAW });

    for (let model of models) {
      await model.destroy({ where: {}, truncate: true });
    }

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { type: QueryTypes.RAW });

    console.log('Banco de dados limpo com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  }
}

module.exports = {
  cleanDB
};
