const { Router } = require('express');
const { getAllReviewsHandler, getReviewsByIdHandler, postReviewHandler, updateReviewHandler, deleteReviewHandler } = require('../handlers/ReviewHandler');

const reviewRouter = Router();

reviewRouter.get('/', getAllReviewsHandler);
reviewRouter.get('/:comicId', getReviewsByIdHandler);
reviewRouter.post('/', postReviewHandler);
reviewRouter.put('/:reviewId', updateReviewHandler);
reviewRouter.delete('/:reviewId', deleteReviewHandler);

module.exports = reviewRouter;