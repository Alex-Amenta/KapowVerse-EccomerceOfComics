const { DataTypes } = require('sequelize');

const favoriteModel = (sequelize) => {
    sequelize.define('favorite', {
        userId: {
          type: DataTypes.UUID,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        comicId: {
          type: DataTypes.UUID,
          references: {
            model: 'comics',
            key: 'id'
          }
        }
      }, { timestamps: false })
} 


module.exports = favoriteModel;
