const { Comic, User, Review, Purchase } = require('../../db');

const postReview = async (rating, comment, userId, comicId) => {
    try {
        const comic = await Comic.findByPk(comicId);
        const user = await User.findByPk(userId);

        if (!comic || !user) {
            throw new Error('El comic o usuario no existe');
        }

        const existingReview = await Review.findOne({
            where: {
                userId,
                comicId,
            },
        });

        if (existingReview) {
            throw new Error(
                'El usuario sólo puede enviar una única reseña por comic'
            );
        }

        const purchase = await Purchase.findOne({
            where: {
                userId,
                comicId,
            },
        });

        if (!purchase) {
            throw new Error(
                'El usuario debe comprar el comic antes de realizar una reseña.'
            );
        }

        const review = await Review.create({
            rating,
            comment,
            name: user.name,
            image: user.image,
        });

        await review.setUser(user);
        await review.setComic(comic);

        return review;
    } catch (error) {
        console.log(error);
    }
};

module.exports = postReview;