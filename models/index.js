const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Activity = require('./activity')(sequelize, Sequelize.DataTypes);
const Artifact = require('./artifact')(sequelize, Sequelize.DataTypes);

User.hasMany(Activity, { foreignKey: 'assigned_to' });
Activity.belongsTo(User, { foreignKey: 'assigned_to' });
Activity.hasMany(Artifact, { foreignKey: 'activity_id' });
Artifact.belongsTo(Activity, { foreignKey: 'activity_id' });

module.exports = {
  sequelize,
  User,
  Activity,
  Artifact
};