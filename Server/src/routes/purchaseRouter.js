const { Router } = require('express');
const {createPurchaseHandler, getPurchaseHandler, getPurchaseByUserHandler} = require('../handlers/PurchaseHandler');

const getPurchaseByComic = require('../controllers/purchase/getPurchaseByComic');
const getAllComicByPurchase = require('../controllers/purchase/getAllComicByPurchase')

const purchaseRouter = Router();

purchaseRouter.get('/', getPurchaseHandler);
purchaseRouter.post('/', createPurchaseHandler);
purchaseRouter.get('/:userId', getPurchaseByUserHandler);
purchaseRouter.get('/comic/:comicId', getPurchaseByComic);
purchaseRouter.get('/comic', getAllComicByPurchase);



module.exports = purchaseRouter;
