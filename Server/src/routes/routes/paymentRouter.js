const { Router } = require('express');
const {
  createOrder,
  receiveWebhook,
} = require('../../handlers/PaymentHandler');

const paymentRouter = Router();

paymentRouter.post('/create-order', createOrder);

// Pago exitoso
paymentRouter.get('/success', (req, res) => {
  return res.status(200).send('Pago Aprobado');
});

// Pago rechazado
paymentRouter.get('/failure', (req, res) => {
  return res.status(200).send('Pago Rechazado');
});

// Pago pendiente
paymentRouter.get('/pending', (req, res) => {
  return res.status(200).send('Pago pendiente');
});

paymentRouter.post('/webhook', receiveWebhook);

module.exports = paymentRouter;
