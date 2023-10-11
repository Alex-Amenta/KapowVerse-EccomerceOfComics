const { Router } = require('express');

const comicRouter = require('./comicRouter');

const mainRouter = Router();

mainRouter.use('/comic', comicRouter);

module.exports = mainRouter;