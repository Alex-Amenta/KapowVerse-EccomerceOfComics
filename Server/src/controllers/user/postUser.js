const { User } = require('../../db');

const postUser = async (name, email, password, image, role, active) => {
    if (!name || !email || !password) throw new Error('No se pudo crear el usuario');
    const user = await User.create({ 
        name, 
        email, 
        password, 
        image: image || undefined, 
        role: role || undefined, 
        active: active
    });

    return user;
}

module.exports = postUser