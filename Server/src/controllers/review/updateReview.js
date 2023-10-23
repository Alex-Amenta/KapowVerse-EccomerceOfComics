const { Review } = require('../../db');

const updateReview = async (reviewId, rating, comment) => {
    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Reseña no encontrada');
        }
        review.rating = rating;
        review.comment = comment;
        await review.save();
        return review;
    } catch (error) {
        throw new Error('Error al actualizar la reseña');
    }
};

module.exports = updateReview;