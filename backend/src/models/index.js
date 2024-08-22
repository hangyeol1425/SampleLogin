const sequelize = require('../../db');
const User = require('./User');
const RefreshToken = require('./RefreshToken');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    RefreshToken,
};