const { Comic, Category } = require('../../db');

const updateComic = async (comicId, updatedData) => {
    // here updatedData.categories is an array of the names of the categories it has, it may be empty
    try {
        const comic = await Comic.findByPk(comicId, {
            include: {
                model: Category,
                attributes: ['name'],
        }});

        if (!comic) {
            throw new Error('Comic not found');
        }
        // Desestructuramos updatedData para separar las categorías de los otros campos
        const { categories: categoryNames, ...otherData } = updatedData;

        // Actualizamos los otros campos del cómic
        await comic.update(otherData);

        if (categoryNames && categoryNames.length > 0) {
            // Buscamos las categorías por sus nombres para obtener sus IDs
            const categories = await Category.findAll({
                where: {
                    name: categoryNames
                }
            });

            // Establecemos las categorías para el cómic
            await comic.setCategories(categories);
        } else {
            // Si no hay categorías, eliminamos todas las asociaciones existentes
            await comic.setCategories([]);
        }
        
        return await Comic.findByPk(comicId, {
            include: {
                model: Category,
                attributes: ['name'],
        }});
    } catch (error) {
        throw new Error('Error updating comic');
    }
};
module.exports = {updateComic};