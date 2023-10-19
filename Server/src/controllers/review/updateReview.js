const { Review } = require('../../db');

const updateReview = async (reviewId, rating, comment) => {
    const review = await Review.findByPk(reviewId);

    if (!review) {
        throw new Error(`The review with ${reviewId} does not exist`)
    };

    review.rating = rating;
    review.comment = comment;

    await review.save();

    return review;
};

module.exports = updateReview;