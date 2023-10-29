const { Router } = require('express');

const comicRouter = require('./comicRouter');
const userRouter = require('./userRouter');
const purchaseRouter = require('./purchaseRouter');
const paymentRouter = require('./paymentRouter');
const reviewRouter = require('./reviewRouter');
const favoritesRouter = require('./favoritesRouter');

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/purchase', purchaseRouter);
mainRouter.use('/payment', paymentRouter);
mainRouter.use('/review', reviewRouter);
mainRouter.use('/favorites', favoritesRouter);

module.exports = mainRouter;