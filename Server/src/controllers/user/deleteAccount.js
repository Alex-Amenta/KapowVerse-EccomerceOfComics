const { User } = require('../../db');

const deleteAccount = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    const deletedUser = await user.destroy();

    return deletedUser;
}

module.exports = deleteAccount