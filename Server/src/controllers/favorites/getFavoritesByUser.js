const { Comic, Category, User } = require('../../db');

const getFavoritesByUser = async (userId) => {
    // Buscar el usuario por ID
    const user = await User.findByPk(userId);

    // Si el usuario no se encuentra, arroja un error
    if (!user) {
        throw new Error('User not found');
    };

    // Obtener todos los cómics favoritos del usuario, incluyendo sus categorías
    const comicsFavoritos = await user.getComics({
        include: [{
            model: Category,
            attributes: ['name'],
            through: { attributes: [] }  // Esto es para excluir los campos de la tabla intermedia en la respuesta
        }]
    });

    return comicsFavoritos;
}

module.exports = getFavoritesByUser;