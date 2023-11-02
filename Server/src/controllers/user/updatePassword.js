/////////////ES PARA ENCRIPTAR LA NUEVA CONTRASEÑA, PERO TENDRÍAMOS QUE DESENCRIPTAR AL MOMENTO DE INICIAR SESIÓN /////////////


// const { User } = require('../../db');
// const bcrypt = require('bcrypt');

// const updatePassword = async (userEmail, newPassword) => {
//     try {
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         const user = await User.findOne({
//             where: { email: userEmail }
//         });

//         if (!user) {
//             throw new Error('User not found');
//         }

//         user.password = hashedPassword;
//         await user.save();

//         return true;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = updatePassword;


const { User } = require('../../db');

const updatePassword = async (userEmail, newPassword) => {
    try {
        const user = await User.findOne({
            where: { email: userEmail }
        });

        if (!user) {
            throw new Error('User not found');
        }

        user.password = newPassword;
        await user.save();

        return { message: 'Password updated!' };
    } catch (error) {
        throw error;
    }
};

module.exports = updatePassword;




