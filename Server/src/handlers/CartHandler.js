const { reduceQuantity } = require('../controllers/cart/reduceQuantity');
const { removeItemFromCart } = require('../controllers/cart/removeItemFromCart');
const { getCartByUserId } = require('../controllers/cart/getCartByUserId');
const { addToCart, calculateUpdatedCart } = require('../controllers/cart/addToCart');

const getCartByUserIdHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cart, total } = await getCartByUserId(userId);
        if (!cart) {
            return res.status(204).json({ cart: [] });
        }
        return res.status(200).json({ cart, total });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const addToCartHandler = async (req, res) => {
    const { userId } = req.params;
    const { comicId } = req.body;
    console.log(userId, comicId);
    try {
        await addToCart(userId, comicId);
        const updatedCart = await calculateUpdatedCart(userId);
        res.status(200).json({ success: true, updatedCart });
    } catch (error) {
        res.status(404).json({ message: error.message });
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
        res.status(404).json({ message: error.message });
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
        res.status(404).json({ message: error.message });
    }
};
module.exports = { getCartByUserIdHandler, addToCartHandler, removeItemFromCartHandler, reduceQuantityHandler };