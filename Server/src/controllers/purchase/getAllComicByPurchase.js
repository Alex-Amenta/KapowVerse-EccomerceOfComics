const { Purchase, Comic } = require('../../db');

const getAllComicByPurchase = async (req, res) => {
    try {
        const comics = await Comic.findAll();

        const comicsWithTotalPurchased = await Promise.all(comics.map(async (comic) => {
            const totalComicPurchased = await Purchase.sum('quantity', {
                where: { comicId: comic.id },
            });
            return {
                ...comic.dataValues,
                totalComicPurchased: totalComicPurchased || 0,
            };
        }));

        res.json(comicsWithTotalPurchased);
    } catch (error) {
        console.error('Error al obtener la lista de cómics con la cantidad total comprada:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getAllComicByPurchase;
