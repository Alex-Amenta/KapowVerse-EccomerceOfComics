const { Review } = require('../../db');

const deleteReview = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Reseña no encontrada');
        }
        await review.update({ status: false });
    } catch (error) {
        throw new Error('Error al eliminar la reseña');
    }
};

module.exports = deleteReview;