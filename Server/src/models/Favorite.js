const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favorite', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, { timestamps: false })
} 