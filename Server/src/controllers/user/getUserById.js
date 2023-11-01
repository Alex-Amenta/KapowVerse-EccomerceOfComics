const { User, Purchase } = require('../../db');

const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        include: Purchase,
    });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

module.exports = getUserById