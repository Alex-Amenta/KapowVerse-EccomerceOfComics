const { Cart } = require('../../db');

const deleteCart = async (userId) => {
    return Cart.destroy({
        where: { userId: userId },
    });
};

module.exports= { deleteCart };
