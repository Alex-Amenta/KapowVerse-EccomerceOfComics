const { Router } = require('express');
const {addCategoryToComic,
    removeCategoryFromComic, getAllComicsHandler, getComicsByIdHandler, postComicHandler, updateComicHandler, getComicsRelatedHandler, toggleComicHandler} = require('../../handlers/ComicHandlers');

const comicRouter = Router();

comicRouter.get('/', getAllComicsHandler);
comicRouter.get('/:id', getComicsByIdHandler);
comicRouter.get('/:id/related', getComicsRelatedHandler);
comicRouter.post('/', postComicHandler);
comicRouter.put('/toggle/:id', toggleComicHandler);
comicRouter.put('/:id', updateComicHandler);

comicRouter.post('/:comicId/categories', addCategoryToComic);
comicRouter.delete('/:comicId/categories/:categoryId', removeCategoryFromComic);

module.exports = comicRouter;
