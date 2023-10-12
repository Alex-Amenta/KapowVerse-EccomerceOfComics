const { Comic } = require('../../db');

const validateComic = async (comic) => {
    if (!comic.title) {
        return { error: 'El título del cómic es obligatorio' };
    }

    if (!comic.price) {
        return { error: 'El precio del cómic es obligatorio' };
    }

    const existingComic = await Comic.findOne({
        where: { title: comic.title },
    });

    if (existingComic) {
        return { error: 'Ya existe un cómic con este título' };
    }

    return {};
};

const createComic = async (comicData) => {
    const validationError = await validateComic(comicData);
    if (validationError.error) {
        throw new Error(validationError.error);
    }

    try {
        const createdComic = await Comic.create(comicData);
        return createdComic;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Comic duplicado');
        }
        throw error;
    }
};

module.exports = { createComic };
