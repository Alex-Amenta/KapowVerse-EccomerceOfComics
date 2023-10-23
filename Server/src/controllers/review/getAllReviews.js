const { Review } = require('../../db');

const getAllReviews = async () => {
    try {
        const reviews = await Review.findAll();
        return reviews;
    } catch (error) {
        throw new Error('Error al obtener reseñas');
    }
};

module.exports = getAllReviews;