const { Review } = require('../../db');

const getReviewById = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        return review;
    } catch (error) {
        throw new Error('Error al obtener la reseña');
    }
};
module.exports = getReviewById;