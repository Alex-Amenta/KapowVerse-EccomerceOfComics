const { DataTypes } = require('sequelize');

const tokenModel = (sequelize) => {
    sequelize.define(
        'token',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            token: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                references: {
                    model: 'users', // Nombre de la tabla que se referencia
                    key: 'email', // Campo en la tabla referenciada
                },
                onDelete: 'CASCADE', // Opciones de eliminación
                onUpdate: 'CASCADE', // Opciones de actualización
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = tokenModel;
