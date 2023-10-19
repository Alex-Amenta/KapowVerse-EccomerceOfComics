const { Router } = require('express');

const comicRouter = require('./comicRouter');
const userRouter = require('./userRouter');
const purchaseRouter = require('./purchaseRouter');
const paymentRouter = require('./paymentRouter');
const cartRouter = require('./cartRouter');
const reviewRouter = require('./reviewRouter');

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/purchase', purchaseRouter);
mainRouter.use('/payment', paymentRouter);
mainRouter.use('/cart', cartRouter);
mainRouter.use('/review', reviewRouter);

module.exports = mainRouter;