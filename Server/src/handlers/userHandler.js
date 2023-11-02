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
const generateResetPasswordToken = require("../controllers/user/generateResetPasswordToken")
const verifyResetPasswordToken = require("../controllers/user/verifyResetPasswordToken")
const updatePassword = require("../controllers/user/updatePassword")

const generateJwt = require("../utils/generateJwt");
// const verifyJwtPassword = require('../../utils/verifyJwtPassword')

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
				res.status(200).json({ message: "User activated!", user: user });
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
				if (!user.dataValues.active) {
					sendEmailConPlantilla(email, "Baned", {
						userName: user.name,
					});
					res.status(401).json({ message: "User is banned" });
				} else {
					res.status(200).json({
						...user.dataValues,
						token: await generateJwt(user.id, user.role),
					});
				}
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

const ResetPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await getUserByEmail(email);
		if (user) {
			const resetPasswordToken = await generateResetPasswordToken(email);
			console.log("Reset Password Token:", resetPasswordToken);
			// sendEmailConPlantilla(email, resetPasswordToken);
			sendEmailConPlantilla(user.email, "Reset", {
				userName: user.dataValues.name,
				token: resetPasswordToken.dataValues.token,
			});

			res.status(200).json({ message: "Password reset email sent!" });
			// res.status(200).json(resetPasswordToken);

		} else {
			res.status(401).json({ message: "User does not exist." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const changePassword = async (req, res) => {
	const { token } = req.params;
	const newPassword = req.body.newPassword;

	try {
		const user = await verifyResetPasswordToken(token);
		if (user) {
			await updatePassword(user.email, newPassword);

			res.status(200).json({ message: 'Contraseña actualizada con éxito' });
		} else {
			res.status(401).json({ message: 'Token de restablecimiento de contraseña inválido' });
		}
	} catch (error) {
		console.error('Error:', error)
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
	deleteAccountHandler,
	userActivateByToken,
	resender,
	ResetPassword,
	changePassword,
};
