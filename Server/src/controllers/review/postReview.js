const { Review, Comic, User } = require('../../db');

const postReview = async (rating, comment, userId, comicId) => {
    const user = await User.findByPk(userId);
    const comic = await Comic.findByPk(comicId);

    if (!user || !comic) {
        throw new Error('The user or comic does not exist');
    };

    // Verificar si el usuario ya tiene una revisión para este cómic
    const existingReview = await Review.findOne({
        where: {
            userId: user.id,
            comicId: comic.id
        }
    });

    if (existingReview) {
        throw new Error('The user has already reviewed this comic');
    }

    const createReview = await Review.create({
        rating,
        comment,
        userId,
        comicId
    });

    await createReview.setComic(comic);
    await createReview.setUser(user);

    return createReview;
};

module.exports = postReview;