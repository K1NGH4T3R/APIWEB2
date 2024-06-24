
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Artifact', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  };