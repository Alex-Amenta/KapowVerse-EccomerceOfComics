const { DataTypes } = require('sequelize');

const purchaseModel = (sequelize) => {
    sequelize.define(
        'purchase',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            comicId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = purchaseModel;
