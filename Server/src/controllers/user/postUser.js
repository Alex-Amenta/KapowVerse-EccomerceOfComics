const { User } = require('../../db');

const postUser = async (name, email, password,status, image, role, activationToken) => {
    if (!name || !email || !password) throw new Error('No se pudo crear el usuario');
    const user = await User.create({ 
        name, 
        email, 
        password, 
        image: image || undefined, 
        role: role || undefined, 
    });

    return user;
}

module.exports = postUser