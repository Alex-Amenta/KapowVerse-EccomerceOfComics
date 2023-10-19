const mercadopago = require('mercadopago')
require("dotenv").config();
const { Purchase, Comic, Orden } = require("../db");
const { FRONT_HOST, BACK_HOST, MP_AR_ACCESS_TOKEN, MP_PE_ACCESS_TOKEN, ENV } = process.env;

let comics = {};
let loggedUser = {};

const createOrder = async (req, res) => {
    const { user, cart } = req.body;
    try {
        if (!user) throw new Error("Usuario no Registrado");
    } catch (error) {
    console.log(error);
    }
    comics = cart;
    loggedUser = user;

    mercadopago.configure({
        access_token: MP_AR_ACCESS_TOKEN,
    });
    try {
        const { price } = req.body;
        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: 'Pago KapowVerse',
                    unit_price: price,
                    currency_id: 'ARS',
                    quantity: 1,
                },
            ],
            back_urls: {
                success: `${FRONT_HOST}/home`,
                failure: `${FRONT_HOST}/home`,
                pending: `${FRONT_HOST}/payment/pending`,
            },
            notification_url: `${
                ENV === "dev"
                  ? "https://fbb5-2803-a3e0-1479-2370-7c49-455c-ed89-9ca6.ngrok.io/payment/webhook"
                  : `${BACK_HOST}/payment/webhook`
              }`,
        });
        res.send(result.body);
    } catch (error) {
        return res.status(500).json({ message: 'Algo va mal' });
    }
};

const receiveWebhook = async (req, res) => {
    try {
        const payment = req.body;
        console.log('ESTE ES PAYMENT', payment);
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            if (comics) {
                const purchase = await Purchase.create({
                  userId: loggedUser.sub,
                  mpId: data.response.id,
                  total: comics.totalPrice,
                });

                comics.cart.forEach(async (comic) => {
                    const comicDB = await Comic.findByPk(comic.id);
                    comicDB.stock -= comic.quantity;
                    await comicDB.save();
          
                    const purchaseDetail = await Orden.create({
                      purchaseId: purchase.id,
                      comicId: comic.id,
                      quantity: comic.quantity,
                    });
                  });
            }
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo va mal' });
    }
};

module.exports = { createOrder, receiveWebhook };
