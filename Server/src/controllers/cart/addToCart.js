const { Cart, CartItem } = require('../../db');

const addToCart = async (userId, itemData) => {
    const { id } = itemData;

    const cart = await Cart.findOne({
        where: { userId: userId },
    });

    if (!cart) {
        const newCart = await Cart.create({ userId: userId });
        return CartItem.create({
            cartId: newCart.id,
            comicId: itemData.id,
            // ..itemData menos el id
            title: itemData.title,
            description: itemData.description,
            price: itemData.price,
            image: itemData.image,
            author: itemData.author,
            stock: itemData.stock,
        });
    }

    return CartItem.create({
        cartId: newCart.id,
        comicId: itemData.id,
        // ..itemData menos el id
        title: itemData.title,
        description: itemData.description,
        price: itemData.price,
        image: itemData.image,
        author: itemData.author,
        stock: itemData.stock,
    });
};

module.exports= { addToCart };
