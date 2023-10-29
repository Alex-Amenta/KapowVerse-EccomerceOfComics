const { Router } = require('express');
const { createFavoritesHandler, deleteFavoritesHandler, getFavoritesByUserHandler } = require('../handlers/favoritesHandler');

const favoritesRouter = Router();

favoritesRouter.post('/', createFavoritesHandler);
favoritesRouter.delete('/:id', deleteFavoritesHandler);
favoritesRouter.get('/:id', getFavoritesByUserHandler);

module.exports = favoritesRouter;