const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const RefreshToken = sequelize.define('RefreshToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'refresh_tokens',
    timestamps: true,
});

module.exports = RefreshToken;