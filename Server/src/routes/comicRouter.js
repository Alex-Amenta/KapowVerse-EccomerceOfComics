const { Router } = require('express');
const {getAllComicsByFiltersHandler, getAllComicsHandler, getComicsByIdHandler, postComicHandler, deleteComicHandler, updateComicHandler} = require('../handlers/ComicHandlers');
const upload = require('../middleware/multer');

const comicRouter = Router();

comicRouter.get('/', getAllComicsHandler);
// comicRouter.get('/', getAllComicsByFiltersHandler);
comicRouter.get('/:id', getComicsByIdHandler);
comicRouter.post('/', upload.single('image'),postComicHandler);
comicRouter.delete('/:id', deleteComicHandler);
comicRouter.put('/:id', upload.single('image'), updateComicHandler);



module.exports = comicRouter;
