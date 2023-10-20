const { configDotenv } = require("dotenv");
const {
	getUserByName,
	getAllUsers,
	getUserByEmail,
} = require("../../controllers/user/getAllUsers");
const { OAuth2Client } = require('google-auth-library');
require ('dotenv').config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const googleLoginUserHandler = async (req, res) => {
    console.log("req:", req.body)
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // Puedes guardar la información del usuario en tu base de datos TODO
        console.log("payload")
        console.log(payload)
        res.status(200).json(payload);
    } catch (error) {
        res.status(401).send('Error de autenticación');
    }
};

module.exports = {
	googleLoginUserHandler,
};
