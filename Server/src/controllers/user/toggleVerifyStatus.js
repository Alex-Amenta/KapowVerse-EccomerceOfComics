const { User } = require('../../db');

const toggleVerifyStatus = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    const updatedStatus = !user.verified;

    await user.update({ verified: updatedStatus });

    return { verified: updatedStatus };
};

module.exports = toggleVerifyStatus;