const { Router } = require('express');
const {getAllComicsByFiltersHandler, getAllComicsHandler, getComicsByIdHandler, postComicHandler, deleteComicHandler, updateComicHandler, getComicsRelatedHandler} = require('../handlers/ComicHandlers');

const comicRouter = Router();

comicRouter.get('/', getAllComicsHandler);
comicRouter.get('/:id', getComicsByIdHandler);
comicRouter.get('/:id/related', getComicsRelatedHandler);
comicRouter.post('/', postComicHandler);
comicRouter.delete('/:id', deleteComicHandler);
comicRouter.put('/:id', updateComicHandler);



module.exports = comicRouter;
