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
const generateJwt = require("../utils/generateJwt")

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

const postUserHandler = async (req, res) => {
	const { name, email, password, image, role } = req.body;
	try {
		const user = await postUser(name, email, password, image, role);
		console.log("datos creados sin google", user);
		const token = await generateJwt(user.id);
		console.log("token", token);
		if (email) {
			sendEmailConPlantilla(email, "User", { userName: name })
		}
		res.status(201).json({...user.dataValues, token});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const toggleUserActiveHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await toggleActiveStatus(id);
		if (user) {
			res.status(200).json({
				message: user.active ? 'Cómic reactivado exitosamente' : 'Cómic desactivado exitosamente'
			});
		} else {
			res.status(404).json({ message: 'Cómic no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error al cambiar el estado del cómic' });
	}
};

const updateUserHandler = async (req, res) => {
	const { id } = req.params;
	const { name, email, password, image } = req.body;
	try {
		const user = await updateUser(id, name, email, password, image);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await getUserByEmail(email);
		if (user[0]) {
			if (user[0].dataValues.password === password) {
				res.status(200).json(user[0]);
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

module.exports = {
	loginUserHandler,
	getAllUsersHandler,
	getUserByIdHandler,
	postUserHandler,
	toggleUserActiveHandler,
	updateUserHandler,
	deleteAccountHandler
};
