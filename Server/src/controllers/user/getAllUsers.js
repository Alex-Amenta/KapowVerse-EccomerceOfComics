const { Op } = require('sequelize');
const { User, Purchase } = require('../../db');

const getAllUsers = async () => {
    const users = await User.findAll({
        include: Purchase,
    });

    if (users.length === 0) {
        throw new Error('No hay usuarios aún');
    }

    return users;
}

const getUserByName = async (name) => {
    const user = await User.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } }
    })

    if (!user) {
        throw new Error('No hay usuarios con ese nombre');
    }

    return user;
}

module.exports = { getAllUsers, getUserByName }