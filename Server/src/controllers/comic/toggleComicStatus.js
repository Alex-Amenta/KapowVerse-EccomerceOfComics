const { Comic } = require('../../db');

const toggleComicStatus = async (id) => {
    const comic = await Comic.findByPk(id);

    if (!comic) {
        throw new Error(`Cómic no encontrado para la identificación: ${id}`);
    }

    const updatedStatus = !comic.active;

    await comic.update({ active: updatedStatus });

    console.log(`Cómic marcado como ${updatedStatus ? 'activo' : 'inactivo'} con éxito: ${comic.id}`);
    return { active: updatedStatus };
    
};


module.exports = { toggleComicStatus };