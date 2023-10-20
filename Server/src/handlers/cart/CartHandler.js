const { getCartByUserId } = require('../../controllers/cart/getCartByUserId');
const { addToCart } = require('../../controllers/cart/addToCart');

const getCartByUserIdHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cart, total } = await getCartByUserId(userId);
        if (!cart) {
            return res.status(204).json({ cart: [] });
        }
        return res.status(200).json({ cart, total });
    } catch (error) {
        return res.status(500).json({ message: 'Error Interno del Servidor' });
    }
};

const addToCartHandler = async (req, res) => {
    const { userId } = req.params;
    const { comicId } = req.body;
    console.log(userId, comicId);
    try {
        const cartItem = await addToCart(userId, comicId);
        console.log(cartItem);
        res.status(200).json({ success: true, cartItem });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'No se pudo agregar el artículo al carrito.',
        });
    }
};

const removeItemFromCartHandler = async (req, res) => {
    const { cartItemId } = req.params;

    try {
        await removeItemFromCart(cartItemId);
        res.status(200).json({
            message: 'Artículo eliminado del carrito con éxito',
        });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el artículo del carrito' });
    }
};

const reduceQuantityHandler = async (req, res) => {
    const { cartItemId } = req.params;
    try {
        await reduceQuantity(cartItemId);
        res.status(200).json({
            message: 'Cantidad del artículo reducida con éxito',
        });
    } catch (error) {
        res.status(500).json({ message: 'No se reducir la cantidad del articulo' });
    }
};

const deleteCartHandler = async (req, res) => {
    const { userId } = req.params;
    try {
        await deleteCart(userId);
        res.status(200).json({
            message: 'Carrito eliminado con éxito',
        });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el carrito' });
    }
};

module.exports = { getCartByUserIdHandler, addToCartHandler, removeItemFromCartHandler, reduceQuantityHandler, deleteCartHandler };