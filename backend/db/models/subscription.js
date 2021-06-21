'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    },
    creatorUserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    }
  }, {});
  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, { foreignKey: 'userId'})
    Subscription.hasMany(models.User, { foreignKey: 'creatorUserId'})
  };
  return Subscription;
};
