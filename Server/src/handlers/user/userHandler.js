const {
	getUserByName,
	getAllUsers,
	getUserByEmail,
} = require("../../controllers/user/getAllUsers");
const getUserById = require("../../controllers/user/getUserById");
const postUser = require("../../controllers/user/postUser");
const updateUser = require("../../controllers/user/updateUser");
const toggleActiveStatus = require("../../controllers/user/toggleActiveStatus");

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
	const { name, email, password } = req.body;
	try {
		const user = await postUser(name, email, password);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const toggleUserActiveHandler = async (req, res) => {
	const { id } = req.params;
	const { activate } = req.body; // El frontend debe enviar un parámetro 'activate' que indique si se debe activar o inactivar al usuario
	try {
		const message = await toggleActiveStatus(id, activate);
		res.status(200).json({ message });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUserHandler = async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;
	try {
		const user = await updateUser(id, name, email, password);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await getUserByEmail(email);
		if (user[0].dataValues.password === password) {
			res.status(200).json(user[0]);
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
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
};
