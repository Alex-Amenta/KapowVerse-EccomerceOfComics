const { User } = require('../../db');

const toggleActiveStatus = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('No se encontraron usuarios con ese ID');
    }

    const updatedStatus = !user.active;

    await user.update({ active: updatedStatus });

    return { active: updatedStatus };
};

module.exports = toggleActiveStatus;