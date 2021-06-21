'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'User'
      }
    },
    soundBiteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SoundBite'
      }
    },
    body: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId'});
    Comment.belongsTo(models.SoundBite, { foreignKey: 'soundBiteId'})
  };
  return Comment;
};
