const { CartItem } = require('../../db');

const removeFromCart = async (cartItemId) => {
    const cartItem = await CartItem.findOne({
        where: { id: cartItemId },
    });

    if (!cartItem) {
        throw new Error('Artículo del carrito no encontrado');
    }

    await cartItem.destroy();
};

module.exports= { removeFromCart };