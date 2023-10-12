const { Router } = require('express');

const comicRouter = require('./comicRouter');
const userRouter = require('./userRouter');

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter;