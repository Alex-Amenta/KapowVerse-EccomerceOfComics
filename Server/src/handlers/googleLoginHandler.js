const { OAuth2Client } = require('google-auth-library');
require ('dotenv').config();
const checkOrCreate = require("../controllers/user/checkOrCreate");

const generateJwt = require("../utils/generateJwt")

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
        const user = await checkOrCreate(payload.name, payload.email, payload.picture, payload.sub);
        console.log("datos creado por google",user)
        const token = await generateJwt(user.id);
        console.log("token", token)
        // res.status(200).json(user);
        const response = {...user.dataValues, token}
        console.log(response)
        res.status(200).json({...user.dataValues, token});
    } catch (error) {
        console.log(error)
        res.status(401).send('Error de autenticación');
    }
};

module.exports = {
	googleLoginUserHandler,
};
