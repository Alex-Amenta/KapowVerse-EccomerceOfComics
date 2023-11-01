const { Comic, User, Purchase } = require('../../db');


const createPurchase = async (purchases) => {
    try {
        const results = [];
        
        for (const { comicId, userId, quantity } of purchases) {
            const comic = await Comic.findByPk(comicId);
            const user = await User.findByPk(userId);
            if (user.verified === false) {
                results.push({
                    error: 'User not verified! Please verify your account.',
                });
                continue;
            }
            if (!comic || !user) {
                results.push({
                    error: 'Comic or user not found',
                });
                continue;
            }

            if (comic.stock < quantity) {
                results.push({
                    error: 'Not enough stock available',
                });
                continue;
            }

            comic.stock -= quantity;
            await comic.save();
            
            const total = comic.price * quantity;


            const purchase = await Purchase.create({
                comicId,
                userId,
                quantity,
                total,
            });

            await purchase.setUser(user);
            await purchase.setComic(comic);

            // await comic.save();

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
