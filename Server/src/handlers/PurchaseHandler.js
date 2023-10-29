const { createPurchase } = require('../controllers/purchase/postPurchase');
const { getPurchase } = require('../controllers/purchase/getAllPurchase');
const { getPurchaseById } = require('../controllers/purchase/getAllPurchaseById');
const { getPurchaseByUser } = require('../controllers/purchase/getPurchaseById');

const createPurchaseHandler = async (req, res) => {
  const { userId, comicId, quantity } = req.body;
  try {
    const results = await createPurchase([{ comicId, userId, quantity }]);

    const allPurchasesSuccessful = results.every(result => !result.error);

    if (allPurchasesSuccessful) {
      res.status(201).json({
        msg: 'Compra realizada con éxito',
        results: results.map(result => result.purchase),
      });
    } else {
      res.status(400).json({
        msg: 'No se pudo realizar la compra debido a la falta de stock',
        results: results,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const getPurchaseHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const purchase = await getPurchaseById(id);
      if (!purchase) {
        return res.status(404).json({ error: 'Compra no encontrada' });
      }
      res.json(purchase);
    } else {
      const purchase = await getPurchase();
      if (!purchase) {
        return res.status(404).json({ error: 'No se encontraron compras' });
      }
      res.json(purchase);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchaseByUserHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const purchase = await getPurchaseByUser(userId);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPurchaseHandler, getPurchaseHandler, getPurchaseByUserHandler };
