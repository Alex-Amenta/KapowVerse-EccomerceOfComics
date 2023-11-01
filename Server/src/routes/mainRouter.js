const { Router } = require('express');

const comicRouter = require('./routes/comicRouter');
const userRouter = require('./routes/userRouter');
const purchaseRouter = require('./routes/purchaseRouter');
const paymentRouter = require('./routes/paymentRouter');
const reviewRouter = require('./routes/reviewRouter');
const favoritesRouter = require('./routes/favoritesRouter');
const categoryRouter = require('./routes/categoryRouter');

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/purchase', purchaseRouter);
mainRouter.use('/payment', paymentRouter);
mainRouter.use('/review', reviewRouter);
mainRouter.use('/favorites', favoritesRouter);
mainRouter.use('/category', categoryRouter);

module.exports = mainRouter;