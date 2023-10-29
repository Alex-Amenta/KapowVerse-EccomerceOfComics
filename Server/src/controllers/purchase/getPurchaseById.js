const { User, Purchase, Comic } = require('../../db');

const getPurchaseByUser = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    const purchase = await Purchase.findAll({ where: { userId: userId }, include: { model: Comic } });

    return purchase;
}

module.exports = { getPurchaseByUser };