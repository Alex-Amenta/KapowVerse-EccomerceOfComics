const { Cart, CartItem, User, Comic } = require('../../db');

const addToCart = async (userId, comicId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Verificar si el cómic está disponible en el stock
    const comic = await Comic.findByPk(comicId);

    if (!comic || comic.stock <= 0) {
        throw new Error('Comic not available');
    }

    const cart = await Cart.findOne({
        where: { userId: userId },
    });

    if (!cart) {
        const newCart = await Cart.create({ userId: userId });
        return CartItem.create({
            cartId: newCart.id,
            comicId: comic.id,
            title: comic.title,
            price: comic.price,
            image: comic.image,
            stock: comic.stock,
            quantity: 1,
        });
    }

    const existingCartItem = await CartItem.findOne({
        where: { cartId: cart.id, comicId: comic.id, },
    });

    if (existingCartItem) {
        // Si el elemento de carrito ya existe, aumenta la cantidad
        existingCartItem.quantity += 1;
        await existingCartItem.save();
    } else {
        // Si el elemento de carrito no existe, créalo
        return CartItem.create({
            cartId: cart.id,
            comicId: comic.id,
            title: comic.title,
            price: comic.price,
            image: comic.image,
            stock: comic.stock,
            quantity: 1,
        });
    }
};

// Función para calcular el carrito actualizado y la cantidad total
const calculateUpdatedCart = async (userId) => {
    const cart = await Cart.findOne({ where: { userId: userId } });

    if (!cart) {
        // Manejo si el carrito no existe
        return {
            cart: null,
            total: 0,
        };
    }

    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return {
        cart: {
            id: cart.id,
            userId: cart.userId,
            cartItems: cartItems,
        },
        total: total,
    };
};

module.exports = { addToCart, calculateUpdatedCart };
