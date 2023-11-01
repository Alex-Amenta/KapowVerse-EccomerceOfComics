const { Review } = require('../../db');

const getReviewById = async (comicId) => {
    try {
        const reviews = await Review.findAll({
            where: { comicId: comicId }
        });
        return reviews;
    } catch (error) {
        throw new Error('Error al obtener la reseña');
    }
};
module.exports = getReviewById;