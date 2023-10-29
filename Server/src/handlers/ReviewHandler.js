const deleteReview = require("../controllers/review/deleteReview");
const getAllReviews = require("../controllers/review/getAllReviews");
const getReviewById = require("../controllers/review/getReviewById");
const postReview = require("../controllers/review/postReview");
const updateReview = require("../controllers/review/updateReview");

const getAllReviewsHandler = async (req, res) => {
    try {
        const reviews = await getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getReviewsByIdHandler = async (req, res) => {
    const { comicId } = req.params;
    try {
        const review = await getReviewById(comicId);
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const postReviewHandler = async (req, res) => {
    const { rating, comment, userId, comicId } = req.body;
    try {
        const review = await postReview(rating, comment, userId, comicId);
        res.status(201).json(review);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateReviewHandler = async (req, res) => {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    try {
        const review = await getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        // Actualizar la review
        const updatedReview = await updateReview(
            reviewId,
            rating,
            comment
        );
        res.json(updatedReview);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteReviewHandler = async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        // Eliminar la review
        await deleteReview(reviewId);
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getAllReviewsHandler,
    getReviewsByIdHandler,
    postReviewHandler,
    updateReviewHandler,
    deleteReviewHandler
}