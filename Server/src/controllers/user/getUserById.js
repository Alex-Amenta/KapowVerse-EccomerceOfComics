const { User, Purchase } = require('../../db');

const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        include: Purchase,
    });
    if (!user) {
        throw new Error('No se encontraron usuarios con ese id');
    }

    return user;
}

module.exports = getUserById