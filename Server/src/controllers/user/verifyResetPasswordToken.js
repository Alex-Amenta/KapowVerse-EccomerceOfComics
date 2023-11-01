const { Token, User } = require('../../db'); 

const verifyResetPasswordToken = async(token)=> {
    try {
        const tokenRecord = await Token.findOne();
        if (tokenRecord) {
            const currentTime = new Date();
            if (tokenRecord.expiresAt > currentTime) {
                const user = await User.findOne({
                    where: {
                        email: tokenRecord.email,
                    },
                });
                return user;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
}

module.exports = verifyResetPasswordToken;

