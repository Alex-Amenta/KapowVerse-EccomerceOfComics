const { Router } = require('express');
const { createFavoritesHandler, deleteFavoritesHandler, getFavoritesByUserHandler } = require('../handlers/favoritesHandler');

const favoritesRouter = Router();

favoritesRouter.post('/', createFavoritesHandler);
favoritesRouter.delete('/', deleteFavoritesHandler);
favoritesRouter.get('/:userId', getFavoritesByUserHandler);

module.exports = favoritesRouter;