const { Purchase, Comic } = require('../../db');

const getPurchaseByComic = async (req, res) => {
    try {
        const comicId = req.params.comicId;
        const comic = await Comic.findByPk(comicId);
        if (!comic) {
            return res.status(404).json({ message: 'Cómic no encontrado' });
        }
        const totalComicPurchased = await Purchase.sum('quantity', {
            where: { comicId: comicId },
        });
      
        res.json({ ...comic.dataValues, totalComicPurchased: totalComicPurchased || 0 });
    } catch (error) {
        console.error('Error al ver el cómic y la cantidad de compras:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getPurchaseByComic