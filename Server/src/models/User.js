const { DataTypes } = require('sequelize');


const userModel = (sequelize) => {
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                defaultValue: 'user',
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            image: {
                type: DataTypes.TEXT,
                
            }
        },
        {
            timestamps: false,
        }
    );
};

module.exports = userModel;
