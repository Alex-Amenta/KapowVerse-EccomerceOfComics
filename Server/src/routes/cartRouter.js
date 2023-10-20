const { Router } = require('express');
const { getCartByUserIdHandler, addToCartHandler, removeFromCartHandler, deleteCartHandler } = require('../handlers/cart/cartHandler');

const cartRoute = Router();

//                 /cart
cartRoute.get('/:userId', getCartByUserIdHandler);
cartRoute.post('/:userId', addToCartHandler);
cartRoute.delete('/:cartItemId', removeFromCartHandler);
cartRoute.delete('/all/:userId', deleteCartHandler);

module.exports = cartRoute;
