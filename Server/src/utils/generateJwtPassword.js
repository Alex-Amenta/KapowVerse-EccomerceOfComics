require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJwtPassword = (email) => {
    return new Promise((resolve, reject) => {
        const payload = { email };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '5m',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = generateJwtPassword;