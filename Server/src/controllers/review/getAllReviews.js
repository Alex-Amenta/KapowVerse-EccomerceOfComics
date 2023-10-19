const { Review, User } = require('../../db');

const getAllReviews = async () => {
    const review = await Review.findAll({
        include: {
            model: User
        }
    });
    return review;
};

module.exports = getAllReviews;