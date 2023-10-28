const { Comic, Favorite, User } = require('../../db');


const getFavoritesByUser = async (id) => {
    const user = await await User.findByPk(id);

    if (!user) {
        throw new Error('Usuario no encontrado');
    };

    const favorites = await Favorite.findAll({
        where: { userId: id, status: true },
        include: Comic
    });

    return favorites;
}

module.exports = getFavoritesByUser;