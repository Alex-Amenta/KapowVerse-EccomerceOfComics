const { getCartByUserId } = require('../controllers/cart/getCartByUserId');
const { addToCart } = require('../controllers/cart/addToCart');
const { removeFromCart } = require('../controllers/cart/removeFromCart');
const { deleteCart } = require('../controllers/cart/deleteCart');

const getCartByUserIdHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cart, total } = await getCartByUserId(userId);
        if (!cart) {
            return res.status(204).json({ cart: [] });
        }
        return res.status(200).json({ cart, total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Interno del Servidor' });
    }
};
const addToCartHandler = async (req, res) => {
    const { userId } = req.params;
    const { ...itemData } = req.body;

    try {
        const cartItem = await addToCart(userId, itemData);
        res.status(200).json({ success: true, cartItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'No se pudo agregar el artículo al carrito.',
        });
    }
};
const removeFromCartHandler = async (req, res) => {
    const { cartItemId } = req.params;

    try {
        await removeFromCart(cartItemId);
        res.status(200).json({
            message: 'Artículo eliminado del carrito con éxito',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'No se pudo eliminar el artículo del carrito' });
    }
};
const deleteCartHandler = async (req, res) => {
    const { userId } = req.params;

    try {
        await deleteCart(userId);
        res.status(200).json({
            message: 'Carrito eliminado exitosamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'No se pudo eliminar el carrito' });
    }
};
module.exports = {getCartByUserIdHandler, addToCartHandler, removeFromCartHandler, deleteCartHandler};