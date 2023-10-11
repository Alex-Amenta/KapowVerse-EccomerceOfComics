const { DataTypes } = require('sequelize');

const Cart = (sequelize) => {
    sequelize.define(
        'cart',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false, 
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Cart;
