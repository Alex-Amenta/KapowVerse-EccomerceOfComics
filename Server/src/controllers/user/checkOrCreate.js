const { User } = require("../../db");

const checkOrCreate = async (name, email, image, password) => {
	if (!name || !email) throw new Error("No se pudo crear el usuario");

	try {
		const user = await User.findOrCreate({
			where: {
				email: email,
			},
			defaults: {
				name: name,
				email: email,
				image: image,
				password: password,
			},
		});
		return user[0]; // [user, created]
	} catch (error) {
		console.log(error);
	}
};

module.exports = checkOrCreate;
