const { User } = require('../../db');

const updateUser = async (id, name, email, password) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('No hay usuario con ese id');
    }

    await user.update({
        name: name,
        email: email,
        password: password
    });

    return `El usuario ${id} se actualizó exitosamente!`;
}

module.exports = updateUser