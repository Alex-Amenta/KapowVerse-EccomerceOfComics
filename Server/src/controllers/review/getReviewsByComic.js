const { Review, Comic, User } = require('../../db');

const getReviewsByComics = async (comicId) => {
    const comic = await Comic.findByPk(comicId);

    if (!comic) {
        throw new Error(`The review with id ${comicId} does not exist`);
    }

    const reviews = Review.findAll({
        where: { comicId: comicId },
        include: { model: User }
    });

    if (!reviews || reviews.length === 0) {
        throw new Error(`No reviews found for comic with id ${comicId}`);
    }

    return reviews;
};

module.exports = getReviewsByComics;