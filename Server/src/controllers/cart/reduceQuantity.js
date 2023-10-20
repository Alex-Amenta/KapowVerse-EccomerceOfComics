const { CartItem } = require('../../db');

const reduceQuantity = async (cartItemId) => {
    const cartItem = await CartItem.findOne({
        where: { id: cartItemId },
    });

    if (!cartItem) {
        throw new Error('Artículo del carrito no encontrado');
    }

    if (cartItem.quantity > 1) {
        // Si la cantidad es mayor que 1, disminuye la cantidad en 1 y guarda el cambio.
        cartItem.quantity -= 1;
        await cartItem.save();
    } else {
        // Si la cantidad es 1 o menos, elimina el artículo del carrito.
        await cartItem.destroy();
    }
};

module.exports = reduceQuantity;
