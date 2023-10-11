const { Router } = require('express');
const {getAllComicsHandler} = require('../handlers/getAllComicHandler');

const comicRouter = Router();

comicRouter.get('/', getAllComicsHandler);


module.exports = comicRouter;
