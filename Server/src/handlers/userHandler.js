const {
	getUserByName,
	getAllUsers,
	getUserByEmail,
} = require("../controllers/user/getAllUsers");
const getUserById = require("../controllers/user/getUserById");
const postUser = require("../controllers/user/postUser");
const updateUser = require("../controllers/user/updateUser");
const toggleActiveStatus = require("../controllers/user/toggleActiveStatus");
const sendEmailConPlantilla = require("../nodemailer/plantillaEmail");
const deleteAccount = require("../controllers/user/deleteAccount");
const actTokenController = require("../controllers/user/actTokenController");

const generateJwt = require("../utils/generateJwt");

const getAllUsersHandler = async (req, res) => {
	const { name } = req.query;
	try {
		if (name) {
			const user = await getUserByName(name);
			res.status(200).json(user);
		} else {
			const allUsers = await getAllUsers();
			res.status(200).json(allUsers);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUserByIdHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await getUserById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
// REGISTER
const postUserHandler = async (req, res) => {
	// register
	const { name, email, password, image, role } = req.body;
	const uploadedImage= await cloudinary.uploader.upload(image,
{
	
upload_preset: 'undsigned_upload',
public_id: `${username}avatar`,
allowed_formats : ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
},
function(error, result) {
	if (error){
		console.log(error);
	}
	console.log(result); })
try {
	res.status(200).json(uploadedImage)
} catch (error) {
	
}

	
	try {
		let rand = function () {
			return Math.random().toString(36).substr(2); // remove `0.`
		};

		let token = function () {
			return rand() + rand(); // to make it longer
		};

		const activationToken = token();
		const user = await postUser(
			name,
			email,
			password,
			false,
			image,
			role,
			activationToken
		);
		// generate token for email activation

		if (email) {
			sendEmailConPlantilla(email, "User", {
				userName: name,
				activationToken: activationToken,
			});
		}
		res.status(201).json({
			...user.dataValues,
			token: await generateJwt(user.id, user.role),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const userActivateByToken = async (req, res) => {
	const { token } = req.params;
	try {
		const user = await actTokenController(token);
		if (user) {
			if (token == user.activationToken) {
				await toggleActiveStatus(user.id, true);
				res.status(200).json({ message: "User activated!" });
			} else {
				res.status(401).json({ message: "Invalid token" });
			}
		} else {
			res.status(401).json({ message: "Invalid token, user does not exist." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const toggleUserActiveHandler = async (req, res) => {
	const { id } = req.params;
	const { activate } = req.body; // El frontend debe enviar un parámetro 'activate' que indique si se debe activar o inactivar al usuario
	try {
		const user = await toggleActiveStatus(id, activate);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUserHandler = async (req, res) => {
	const { id } = req.params;
	const { name, email, password, image } = req.body;
	try {
		const user = await updateUser(id, name, email, password, image);
		res.status(200).json({
			...user.dataValues,
			token: await generateJwt(user.id, user.role),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
// res.status(201).json({...user.dataValues, token});
const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await getUserByEmail(email);
		if (user) {
			if (user.dataValues.password === password) {
				res.status(200).json({
					...user.dataValues,
					token: await generateJwt(user.id, user.role),
				});
				// res.status(200).json(user);
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		} else {
			res.status(401).json({ message: "User does not exist." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteAccountHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await deleteAccount(id);
		res.status(204).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const resender = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await getUserById(id);
		if (user) {
			if (!user.dataValues.active) {
				sendEmailConPlantilla(user.email, "Resend", {
					userName: user.dataValues.name,
					activationToken: user.dataValues.activationToken,
				});
				res.status(200).json({ message: "Email sent!" });
			} else {
				res.status(401).json({ message: "User already activated" });
			}
		} else {
			res.status(401).json({ message: "User does not exist." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = {
	loginUserHandler,
	getAllUsersHandler,
	getUserByIdHandler,
	postUserHandler,
	toggleUserActiveHandler,
	updateUserHandler,
	deleteAccountHandler,
	userActivateByToken,
	resender,
};
