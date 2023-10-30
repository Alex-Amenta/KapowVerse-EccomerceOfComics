const { Comic, Favorite, User } = require('../../db');

const deleteFavorite = async (userId, comicId) => {
    const user = await User.findByPk(userId)
    const comic = await Comic.findByPk(comicId);

    if (!comic || !user) {
        throw new Error('User or comic not found');
    }

    await user.removeComic(comic);
};

module.exports = deleteFavorite;