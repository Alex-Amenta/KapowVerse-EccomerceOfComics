const { User } = require('../../db');

const toggleVerifyStatus = async (id, status) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    if (status !== user.verified) {
        await user.update({ verified: status });
    }

    return { verified: status };
};

module.exports = toggleVerifyStatus;