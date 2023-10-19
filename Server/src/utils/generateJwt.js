require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJwt = (uid, role) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h',
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

module.exports = generateJwt;