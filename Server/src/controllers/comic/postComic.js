const { Comic, Category } = require("../../db");

const createComic = async (
	title,
	description,
	imagenURL,
	price,
	stock,
	author,
	publisher,
	categories
) => {
	const newComic = await Comic.create({
		title,
		description,
		image: imagenURL,
		price,
		stock,
		author,
		publisher,
	});
	if (!newComic) throw new Error(`Couldn't create comic`);
	// Si se proporcionan categorías, establecemos la relación
	if (categories && categories.length) {
		const categorys = await Category.findAll({
			where: { name: categories },
		});
		await newComic.setCategories(categorys);
	} else {
		// Si no se proporcionan categorías, eliminamos todas las asociaciones
		await newComic.setCategories([]);
	}
	return await Comic.findByPk(newComic.dataValues.id, {
		include: {
			model: Category,
			attributes: ["name"],
		},
	});;
};

module.exports = { createComic };
