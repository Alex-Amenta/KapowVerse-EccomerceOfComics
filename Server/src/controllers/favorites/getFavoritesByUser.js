const { Comic, Favorite, User } = require('../../db');


const getFavoritesByUser = async (userId) => {
    const user = await await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    };

    const comicsFavoritos = await user.getComics();

    return comicsFavoritos;
}

module.exports = getFavoritesByUser;