const { Comic, Favorite, User } = require('../../db');

const postFavorite = async (userId, comicId) => {
    const user = await User.findByPk(userId)
    const comic = await Comic.findByPk(comicId);
    
    if (!comic || !user) {
        throw new Error('User or comic not found');
    };
    if (user.active === false) {
        throw new Error('User not active! Please activate your account.');
    };
    const favorite =
        await Favorite.findOne({
            where: {
                userId: user.id,
                comicId: comic.id
            }
        });
    if (favorite) {
        throw new Error('Comic already in favorites');
    }

    
    await Favorite.create({
        userId: user.id,
        comicId: comic.id
    });

    // return await Favorite.findAll({
    //     where: {
    //         userId: userId
    //     },
    //     include: {
    //         model: Comic,
    //         attributes: ['id', 'title', 'description', 'price', 'stock', 'image', 'publicationDate', 'pages', 'author', 'editorial', 'format', 'language', 'category', 'createdAt', 'updatedAt']
    //     }
    // });

};

module.exports = postFavorite;