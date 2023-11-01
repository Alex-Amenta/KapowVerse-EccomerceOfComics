const { DataTypes } = require('sequelize');

const Comic = (sequelize) => {
    sequelize.define(
        'comic',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            publisher: {
                type: DataTypes.ENUM(
                    'Marvel',
                    'DC',
                    'Manga'
                ),
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Comic;

