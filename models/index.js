const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Activity = require('./activity')(sequelize, Sequelize);
const Artifact = require('./artifact')(sequelize, Sequelize);

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