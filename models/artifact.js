
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Artifact', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  };