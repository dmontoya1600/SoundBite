'use strict';
module.exports = (sequelize, DataTypes) => {
  const SoundBite = sequelize.define('SoundBite', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    },
    libraryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Library'
      }
    },
    url: DataTypes.STRING
  }, {});
  SoundBite.associate = function(models) {
    SoundBite.belongsTo(models.User, {foreignKey: 'userId'})
    SoundBite.belongsTo(models.Library, { foreignKey: 'libraryId'})
    SoundBite.hasMany(models.Comment, {foreignKey: 'soundBiteId'})
  };
  return SoundBite;
};
