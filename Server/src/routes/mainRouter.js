const { Router } = require('express');

const comicRouter = require('./comicRouter');
const userRouter = require('./userRouter');
const purchaseRouter = require('./purchaseRouter')

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/purchase', purchaseRouter);

module.exports = mainRouter;