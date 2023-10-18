const { Router } = require('express');
const { getAllReviewsHandler, getReviewsByComicHandler, postReviewHandler, updateReviewHandler, deleteReviewHandler } = require('../handlers/review/ReviewHandler');

const reviewRouter = Router();

reviewRouter.get('/', getAllReviewsHandler);
reviewRouter.get('/:comicId', getReviewsByComicHandler);
reviewRouter.post('/', postReviewHandler);
reviewRouter.put('/:reviewId', updateReviewHandler);
reviewRouter.delete('/:reviewId', deleteReviewHandler);

module.exports = reviewRouter;