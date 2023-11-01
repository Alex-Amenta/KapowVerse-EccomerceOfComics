const { Review } = require('../../db');

const deleteReview = async (reviewId) => {
    const review = await Review.findByPk(reviewId);

    if (!review) {
        throw new Error('Review not found');
    }

    await review.destroy();

};

module.exports = deleteReview;