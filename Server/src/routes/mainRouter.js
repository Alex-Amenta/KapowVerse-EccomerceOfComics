const { Router } = require('express');
const nodemailerRouter = require("./nodemailerRouter")
const comicRouter = require('./comicRouter');
const userRouter = require('./userRouter');
const purchaseRouter = require('./purchaseRouter')

const mainRouter = Router();

mainRouter.use('/mail', nodemailerRouter)
mainRouter.use('/comic', comicRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/purchase', purchaseRouter);

module.exports = mainRouter;