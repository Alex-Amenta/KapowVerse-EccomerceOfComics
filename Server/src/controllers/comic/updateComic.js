const { Comic } = require('../../db');

const updateComic = async (comicId, updatedData) => {
    try {
        const comic = await Comic.findByPk(comicId);

        if (!comic) {
            throw new Error('Comic no encontrado');
        }

        await comic.update(updatedData);

        return comic;
    } catch (error) {
        throw new Error('Error al actualizar el comic');
    }
};
module.exports = {updateComic};