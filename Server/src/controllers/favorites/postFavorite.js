const { Comic, Favorite, User } = require('../../db');

const postFavorite = async (userId, comicId) => {
    const user = await User.findByPk(userId)
    const comic = await Comic.findByPk(comicId);

    if (!comic || !user) {
        throw new Error('El comic o usuario no existe');
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
            throw new Error('El cómic ya está en favoritos');
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