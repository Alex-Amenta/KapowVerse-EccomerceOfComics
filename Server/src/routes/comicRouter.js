const { Router } = require('express');
const {getAllComicsByFiltersHandler, getAllComicsHandler, getComicsByIdHandler, postComicHandler, updateComicHandler, getComicsRelatedHandler, toggleComicHandler} = require('../handlers/ComicHandlers');

const comicRouter = Router();

comicRouter.get('/', getAllComicsHandler);
comicRouter.get('/:id', getComicsByIdHandler);
comicRouter.get('/:id/related', getComicsRelatedHandler);
comicRouter.post('/', postComicHandler);
comicRouter.put('/toggle/:id', toggleComicHandler);
comicRouter.put('/:id', updateComicHandler);



module.exports = comicRouter;
