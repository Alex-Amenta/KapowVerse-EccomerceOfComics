const { Router } = require('express');

const comicRouter = require('./comicRouter');
const userRouter = require('./userRouter');
const purchaseRouter = require('./purchaseRouter');
const reviewRouter = require('./reviewRouter');

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/purchase', purchaseRouter);
mainRouter.use('/review', reviewRouter);

module.exports = mainRouter;