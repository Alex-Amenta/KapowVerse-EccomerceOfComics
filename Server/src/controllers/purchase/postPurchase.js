const { Comic, User, Purchase } = require('../../db');


const createPurchase = async (purchases) => {
    try {
        const results = [];

        for (const { comicId, userId, quantity } of purchases) {
            const comic = await Comic.findByPk(comicId);
            const user = await User.findByPk(userId);

            if (!comic || !user) {
                results.push({
                    error: 'El cómic o el usuario no existen',
                });
                continue;
            }

            if (comic.stock < quantity) {
                results.push({
                    error: 'No hay suficiente stock disponible',
                });
                continue;
            }

            const total = comic.price * quantity;

            comic.stock -= quantity;

            const purchase = await Purchase.create({
                comicId,
                userId,
                quantity,
                total,
            });

            await purchase.setUser(user);
            await purchase.setComic(comic);

            await comic.save();

            results.push({
                purchase: purchase,
            });
        }

        return results;
    } catch (error) {
        throw error;
    }
};



module.exports = {createPurchase};