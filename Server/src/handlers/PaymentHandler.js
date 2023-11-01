const mercadopago = require("mercadopago");
require("dotenv").config();
const { Purchase, Comic } = require("../db");
const {
	FRONT_HOST,
	PORTS_SERVER,
	MP_AR_ACCESS_TOKEN,
	MP_PE_ACCESS_TOKEN,
	DEV,
	FE_DEPLOY,
	BE_DEPLOY,
} = process.env;
const transporter = require("../nodemailer/postEmail");

let comics = {};
let loggedUser = {};

const createOrder = async (req, res) => {
	const { user, cart } = req.body;
	try {
		if (!user) throw new Error("User not found");
		if (user.verified === false)	throw new Error("User not verified! Please verified your account.");

		comics = cart;
		loggedUser = user;

		mercadopago.configure({
			access_token: MP_AR_ACCESS_TOKEN,
		});
		const result = await mercadopago.preferences.create({
			items: [
				{
					title: "Pago KapowVerse",
					unit_price: cart.totalPrice,
					currency_id: "ARS",
					quantity: 1,
				},
			],
			back_urls: {
				success: `${
					DEV === "development" ? `${FRONT_HOST}/home` : `${FE_DEPLOY}/home`
				}`,
				failure: `${
					DEV === "development" ? `${FRONT_HOST}/home` : `${FE_DEPLOY}/home`
				}`,
				pending: `${
					DEV === "development"
						? `${FRONT_HOST}/payment/pending`
						: `${FE_DEPLOY}/payment/pending`
				}`,
			},
			auto_return: "approved",
			notification_url: `${
				DEV === "development"
					? `${PORTS_SERVER}/payment/webhook`
					: `${BE_DEPLOY}/payment/webhook`
			}`,
		});
		res.send(result.body);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const receiveWebhook = async (req, res) => {
	const payment = req.query;

    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment["data.id"]);
            if (data.response.status === 'approved') {
                if (comics) {
                    for (const comic of comics.cart) {
                        const purchase = await Purchase.create({
                            userId: loggedUser.id,
                            comicId: comic.id,
                            mpId: data.response.id,
                            total: comics.totalPrice,
                            quantity: comic.quantity,
                            status: data.response.status,
                        });
                        const comicDB = await Comic.findByPk(comic.id);
                        comicDB.stock -= comic.quantity;
                        await comicDB.save();
                    }
                }
                const emailOptions = {
                    from: "kapowverse@gmail.com",
                    to: loggedUser.email,
                    subject: "Successful payment",
                    text: "Your purchase has been successful!",
                    html: `
                    <!DOCTYPE html>
<html>
<head>
  <title>Thank you for your purchase!!!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .thank-you {
      text-align: center;
      margin-bottom: 20px;
    }
    .message {
      margin-bottom: 20px;
    }
    .comics-image {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: auto;
    }
    .footer {
      text-align: center;
      font-size: 14px;
    .white-background {
      background-color: #ffffff;
      color: #000000;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    
    .black-background {
      background-color: #000000;
      color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(255,255,255,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header white-background">
      <h1>¡Thank you for your purchase!</h1>
    </div>
    <div class="thank-you white-background">
      <p>Dear ${loggedUser.name},</p>
      <p>Thank you very much for choosing us! We are delighted that you have successfully made your purchase and we hope you enjoy your new acquisition. If you encounter any issues, please do not hesitate to contact us 24/7.</p>
    </div>
    <div class="footer white-background">
      <p>Enjoy your comics!</p>
      <p>Sincerely, <br> your KapowVerse team</p>
    </div>
  </div>
</body>
</html>`,
                  };
                  transporter.sendMail(emailOptions, (error, info) => {
                    if (error) {
                      console.log("Email error: ", error.message);
                    } else {
                      console.log("Correo enviado correctamente 📧");
                    }
                  });
                
            }
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message });
    }
};

module.exports = { createOrder, receiveWebhook };
