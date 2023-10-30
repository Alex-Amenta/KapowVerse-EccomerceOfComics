const { Purchase } = require('../../db');

const getMonthlyPurchase = async (req, res) => {
  try {
    const monthlyPurchases = await Purchase.findAll({
      attributes: [
        'purchaseDate',
        'total',
      ],
    });

    res.json(monthlyPurchases);
  } catch (error) {
    console.error('Error al obtener las compras mensuales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = getMonthlyPurchase;
