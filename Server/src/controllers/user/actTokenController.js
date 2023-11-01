const { User } = require('../../db');

const actTokenController = async (activationToken) => {
    
    const user = await User.findOne({ where: { activationToken: activationToken } });
    return user;
}

module.exports = actTokenController