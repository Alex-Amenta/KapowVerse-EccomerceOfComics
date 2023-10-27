const { Favorite } = require('../../db');

const deleteFavorite = async (id) => {
    const favorite = await Favorite.findByPk(id);

    if (!favorite) {
        throw new Error('Favorito no encontrado');
    }

    await favorite.update({ status: false });

    return "Favorito eliminado exitosamente"
};

module.exports = deleteFavorite;