const { Cart, CartItem } = require('../../db');

const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({
        where: { userId: userId },
        include: {
            model: CartItem,
        },
    });

    if (!cart) {
        return { cart: null, total: 0 };
    }

    const cartItems = cart.cartItems;
    let total = 0;

     cartItems.forEach((item) => {
        const price = item.price;
        const quantity = item.quantity;
        total += price * quantity; // Multiplica precio por cantidad (stock)
    });

    return { cart, total };
};

module.exports= { getCartByUserId };
