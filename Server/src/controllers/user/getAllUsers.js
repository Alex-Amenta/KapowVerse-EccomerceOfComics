const { Op } = require('sequelize');
const { User, Purchase } = require('../../db');

const getAllUsers = async () => {
    const users = await User.findAll({
        include: Purchase,
    });

    if (users.length === 0) {
        throw new Error('No users found');
    }

    return users;
}

const getUserByName = async (name) => {
    const user = await User.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } }
    })

    if (!user) {
        throw new Error('No users with that name');
    }

    return user;
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: { email:  email }
    })

    if (!user) {
        throw new Error('No users with that email');
    }

    return user;
}

module.exports = { getAllUsers, getUserByName, getUserByEmail }