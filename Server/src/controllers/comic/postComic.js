const { Comic } = require("../../db");

// const validateComic = async (comic) => {
//     if (!comic.title) {
//         return { error: 'El título del cómic es obligatorio' };
//     }

//     if (!comic.price) {
//         return { error: 'El precio del cómic es obligatorio' };
//     }

//     const existingComic = await Comic.findOne({
//         where: { title: comic.title },
//     });

//     if (existingComic) {
//         return { error: 'Ya existe un cómic con este título' };
//     }

//     return {};
// };

const createComic = async (
	title,
	description,
	imagenURL,
	price,
	stock,
	author,
	publisher,
	categoryIds
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
	if (!newComic) throw new Error(`El comic ${title} no pudo crearse.`);

	// Si se proporcionan categorías, establecemos la relación
	if (categoryIds && categoryIds.length) {
		const categories = await Category.findAll({
			where: { id: categoryIds },
		});
		await newComic.setCategories(categories);
	}

	return newComic.dataValues;
};

module.exports = { createComic };
