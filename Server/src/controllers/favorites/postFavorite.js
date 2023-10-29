const { Comic, Favorite, User } = require('../../db');

const postFavorite = async (userId, comicId) => {
    const user = await User.findByPk(userId)
    const comic = await Comic.findByPk(comicId);
    if (user.active === false) {
        throw new Error('User not active! Please activate your account.');
    };
    if (!comic || !user) {
        throw new Error('User or comic not found');
    };

    let existingFavorite = await Favorite.findOne({
        where: { userId, comicId },
        include: Comic,
    });

    if (existingFavorite) {
        if (!existingFavorite.status) {
            // Si está inactivo, actualízalo a activo
            await existingFavorite.update({ status: true });
        } else {
            throw new Error('Comic already favorited');
        }
    } else {
        existingFavorite = await Favorite.create({
            userId,
            comicId,
        });

        await comic.addFavorite(existingFavorite);
    }

    return existingFavorite;

};

module.exports = postFavorite;