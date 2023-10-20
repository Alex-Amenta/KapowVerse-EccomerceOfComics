const { Router } = require('express');
const { getCartByUserIdHandler, addToCartHandler, removeItemFromCartHandler, deleteCartHandler} = require('../handlers/cart/CartHandler');

const cartRoute = Router();

//                 /cart
cartRoute.get('/:userId', getCartByUserIdHandler);
cartRoute.post('/:userId', addToCartHandler);
cartRoute.delete('/:cartItemId', removeItemFromCartHandler);
cartRoute.delete('/all/:userId', deleteCartHandler);

module.exports = cartRoute;
