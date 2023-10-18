const { Review } = require('../../db');

const deleteReview = async (reviewId) => {
    const review = await Review.findByPk(reviewId);

    if (!review) {
        throw new Error(`The review with ${reviewId} does not exist`)
    };

    await review.destroy();

    return 'Review deleted successfully';
};

module.exports = deleteReview;