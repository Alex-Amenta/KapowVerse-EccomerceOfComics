const { Router } = require('express');
const { getCartByUserIdHandler, addToCartHandler, reduceQuantityHandler, removeItemFromCartHandler } = require('../handlers/CartHandler');

const cartRouter = Router();

cartRouter.get('/:userId', getCartByUserIdHandler);
cartRouter.post('/:userId/add', addToCartHandler);
cartRouter.delete('/item/:cartItemId', reduceQuantityHandler);
cartRouter.delete('/item/:cartItemId/remove', removeItemFromCartHandler);

module.exports = cartRouter;
