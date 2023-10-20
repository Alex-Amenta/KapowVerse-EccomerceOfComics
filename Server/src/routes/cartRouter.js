const { Router } = require('express');
<<<<<<< HEAD
const { getCartByUserIdHandler, addToCartHandler, removeFromCartHandler, deleteCartHandler } = require('../handlers/cart/cartHandler');

const cartRoute = Router();

//                 /cart
cartRoute.get('/:userId', getCartByUserIdHandler);
cartRoute.post('/:userId', addToCartHandler);
cartRoute.delete('/:cartItemId', removeFromCartHandler);
cartRoute.delete('/all/:userId', deleteCartHandler);

module.exports = cartRoute;
=======
const { getCartByUserIdHandler, addToCartHandler, reduceQuantityHandler, removeItemFromCartHandler } = require('../handlers/CartHandler');

const cartRouter = Router();

cartRouter.get('/:userId', getCartByUserIdHandler);
cartRouter.post('/:userId/add', addToCartHandler);
cartRouter.delete('/item/:cartItemId', reduceQuantityHandler);
cartRouter.delete('/item/:cartItemId/remove', removeItemFromCartHandler);

module.exports = cartRouter;
>>>>>>> main
