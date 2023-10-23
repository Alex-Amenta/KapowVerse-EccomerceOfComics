const { User } = require('../../db');

const updateUser = async (id, name, email, password, image) => {
    const user = await User.findByPk(id);
    if (!name) {
        name = user.name;
    }
    if (!email) {
        email = user.email;
    }
    if (!password) {
        password = user.password;
    }
    if (!image) {
        image = user.image;
    }
    if (!user) {
        throw new Error('No hay usuario con ese id');
    }

    await user.update({
        name: name,
        email: email,
        password: password,
        image: image
    });

    return user;
}

module.exports = updateUser