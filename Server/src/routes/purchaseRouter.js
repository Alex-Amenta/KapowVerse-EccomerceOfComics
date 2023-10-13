const { Router } = require('express');
const {createPurchaseHandler, getPurchaseHandler} = require('../handlers/PurchaseHandler');


const purchaseRouter = Router();

purchaseRouter.get('/', getPurchaseHandler);
purchaseRouter.post('/', createPurchaseHandler);



module.exports = purchaseRouter;
