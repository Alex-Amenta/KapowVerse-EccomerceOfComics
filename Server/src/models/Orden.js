const { DataTypes } = require('sequelize');

const Orden = (sequelize) => {
    sequelize.define(
        'orden',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            purchaseId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            comicId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Orden;
