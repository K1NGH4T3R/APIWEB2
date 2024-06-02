module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });
  
    return Activity;
  };