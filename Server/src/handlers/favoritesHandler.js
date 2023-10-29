const deleteFavorite = require("../controllers/favorites/deleteFavorite");
const getFavoritesByUser = require("../controllers/favorites/getFavoritesByUser");
const postFavorite = require("../controllers/favorites/postFavorite");

const createFavoritesHandler = async (req, res) => {
    const { userId, comicId } = req.body;
    if (!userId || !comicId) {
        return res.status(400).json({ message: "Missing required information" })
    }
    try {
        const favorites = await postFavorite(userId, comicId);
        res.status(201).json(favorites);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};
const deleteFavoritesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteFavorite(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};
const getFavoritesByUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const favorite = await getFavoritesByUser(id);
        res.status(200).json(favorite);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

module.exports = {
    createFavoritesHandler,
    deleteFavoritesHandler,
    getFavoritesByUserHandler,
}