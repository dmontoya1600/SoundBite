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
    imageUrl: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
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
