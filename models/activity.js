module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Activity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });
  };