const { Purchase, User } = require('../../db');

const getPurchase = async () => {
    try {
      const purchase = await Purchase.findAll({
        include: {
          model: User
        }
      });
      return purchase;
    } catch (error) {
      throw new Error('No se pudo obtener las compras');
    }
  };

module.exports ={ getPurchase };