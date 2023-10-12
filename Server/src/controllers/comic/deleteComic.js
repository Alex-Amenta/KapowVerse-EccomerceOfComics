const { Comic } = require('../../db');
const deleteComic = async (id) => {
    try {
        const comic = await Comic.findByPk(id);

        if (!comic) {
            console.log(`Cómic no encontrado para la identificación: ${id}`);
            return false;
        }

        await comic.update({ active: false });
        console.log(`Cómic marcado como inactivo con éxito: ${comic.id}`);
        return true;
    } catch (error) {
        console.log(`Error al marcar el cómic como inactivo: ${error}`);
        return false;
    }
};


module.exports = {deleteComic};