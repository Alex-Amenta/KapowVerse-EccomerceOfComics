const { User } = require('../db');

const verifyIsAdmin = async (uid) => {
    try {
        const user = await User.findOne({ where: { id: uid } });
        return Boolean(user.role !== 'admin');
    } catch (error) {
        console.error(
            'Error al verificar si el usuario es administrador:',
            error
        );
        return false;
    }
};

module.exports = verifyIsAdmin;
