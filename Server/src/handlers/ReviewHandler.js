const deleteReview = require("../controllers/review/deleteReview");
const getAllReviews = require("../controllers/review/getAllReviews");
const getReviewsByComics = require("../controllers/review/getReviewsByComic");
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

const getReviewsByComicHandler = async (req, res) => {
    const { comicId } = req.params;
    try {
        const reviews = await getReviewsByComics(comicId);
        res.status(200).json(reviews);
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
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    try {
        const review = await updateReview(reviewId, rating, comment);
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteReviewHandler = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await deleteReview(reviewId);
        res.status(204).json(review);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getAllReviewsHandler,
    getReviewsByComicHandler,
    postReviewHandler,
    updateReviewHandler,
    deleteReviewHandler
}