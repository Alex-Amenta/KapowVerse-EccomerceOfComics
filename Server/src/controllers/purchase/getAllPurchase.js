const { Purchase } = require('../../db');

const getPurchase = async () => {
    try {
      const purchase = await Purchase.findAll();
      return purchase;
    } catch (error) {
      throw new Error('No se pudo obtener las compras');
    }
  };

module.exports ={ getPurchase };