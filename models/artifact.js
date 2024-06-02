module.exports = (sequelize, DataTypes) => {
    const Artifact = sequelize.define('Artifact', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Artifact;
  };