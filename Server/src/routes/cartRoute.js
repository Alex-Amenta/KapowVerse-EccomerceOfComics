const { Router } = require('express');
const {getCartByUserIdHandler} = require('../controllers/cart/getCartByUserId');
const {addToCartHandler} = require('../controllers/cart/addToCart');
const {removeFromCartHandler} = require('../controllers/cart/removeFromCart');
const {deleteCartHandler} = require('../controllers/cart/deleteCart');

const cartRoute = Router();

cartRoute.get('/:userId', getCartByUserIdHandler);
cartRoute.post('/:userId', addToCartHandler);
cartRoute.delete('/:cartItemId', removeFromCartHandler);
cartRoute.delete('/all/:userId', deleteCartHandler);

module.exports = cartRoute;
