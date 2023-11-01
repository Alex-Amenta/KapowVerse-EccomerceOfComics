const { Token } = require('../../db');
const generateJwtPassword = require('../../utils/generateJwtPassword')

const generateResetPasswordToken = async (email) => {
    const resetPasswordToken = await generateJwtPassword(email);
    const expiresInMinutes = 5
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + expiresInMinutes * 60000);
    const token = await Token.create({
        token: resetPasswordToken,
        email: email,
        expiresAt: expirationTime,
    });


    return token;
};

module.exports = generateResetPasswordToken