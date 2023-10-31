const { DataTypes } = require('sequelize');

const Category = (sequelize) => {
    sequelize.define(
        'category',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: false,
    });
};

module.exports = Category;

