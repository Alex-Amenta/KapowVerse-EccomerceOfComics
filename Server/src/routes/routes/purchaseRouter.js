const { Router } = require('express');
const {createPurchaseHandler, getPurchaseHandler, getPurchaseByUserHandler} = require('../../handlers/PurchaseHandler');

const getPurchaseByComic = require('../../controllers/purchase/getPurchaseByComic');
const getAllComicByPurchase = require('../../controllers/purchase/getAllComicByPurchase');
const getMonthlyPurchase = require('../../controllers/purchase/getMonthlyPurchaseTotals');

const purchaseRouter = Router();

purchaseRouter.get('/', getPurchaseHandler);
purchaseRouter.post('/', createPurchaseHandler);
purchaseRouter.get('/comics', getAllComicByPurchase);
purchaseRouter.get('/monthly', getMonthlyPurchase);
purchaseRouter.get('/:userId', getPurchaseByUserHandler);
purchaseRouter.get('/comic/:comicId', getPurchaseByComic);



module.exports = purchaseRouter;
