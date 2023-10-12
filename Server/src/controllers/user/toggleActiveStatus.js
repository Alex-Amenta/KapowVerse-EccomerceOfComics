const { User } = require('../../db');

const toggleActiveStatus = async (id, activate = false) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('No se encontraron usuarios con ese ID');
    }


    if (user.active === activate) {
        return `El usuario con ID ${id} ya tiene el estado activo: ${activate ? 'activo' : 'inactivo'}`;
    }

    await user.update({ active: activate });

    return `El usuario con ID ${id} ha sido marcado como ${activate ? 'activo' : 'inactivo'}`;
};

module.exports = toggleActiveStatus;