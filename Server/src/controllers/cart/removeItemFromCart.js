const { CartItem } = require('../../db');

const removeItemFromCart = async (cartItemId) => {
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
        throw new Error('Artículo del carrito no encontrado');
    }

    await cartItem.destroy();
};

module.exports = { removeItemFromCart };