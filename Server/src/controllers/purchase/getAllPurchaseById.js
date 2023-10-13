const { Purchase } = require('../../db');

const getPurchaseById = async (id) => {
    try {
        const purchase = await Purchase.findByPk(id);
        return purchase;
    } catch (error) {
        throw new Error('No se pudo obtener la compra');
    }
};

module.exports ={ getPurchaseById };