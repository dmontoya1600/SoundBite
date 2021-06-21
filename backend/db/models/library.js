'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    },
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Library.associate = function(models) {
    Library.belongsTo(models.User, { foreignKey: 'userId'})
    Library.hasMany(models.SoundBite, {foreignKey: 'libraryId'})
  };
  return Library;
};
