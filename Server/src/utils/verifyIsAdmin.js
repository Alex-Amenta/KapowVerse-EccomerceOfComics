const { User } = require('../db');

const verifyIsAdmin = async (req, res, next) => {
    const user = req.user;  // Esto proviene de verifyJWT

    if (!user) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    const { uid } = user;
    const userFromDB = await User.findByPk(uid);


    if (!userFromDB) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    if (userFromDB.role !== 'admin') {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }


    next();
};

module.exports = verifyIsAdmin;
