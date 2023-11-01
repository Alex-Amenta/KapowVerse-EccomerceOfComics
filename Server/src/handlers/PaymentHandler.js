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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Thank you for your purchase!!!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #9f2d1c;
            color: #fff;
            text-align: center;
            padding: 10px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .content {
            padding: 20px;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Thank you for your purchase!</h1>
        </div>
        <div class="content">
            <p>Dear ${loggedUser.name},</p>
            <p>On behalf of the entire team at KapowVerse, we want to thank you for your purchase! Thank you for trusting us to add more excitement to your comic collection!</p>
            <p>We hope the comics you acquired bring you hours of entertainment, adventure, and excitement. At KapowVerse, we strive to offer a wide range of fascinating stories and unforgettable characters to satisfy your passion for the world of comics and mangas.</p>
            <p>If there is anything we can assist you with or if you have any questions about your purchase, please do not hesitate to contact us. We are here to ensure that your experience with us is exceptional.</p>
            <p>Thank you again for supporting our store! We hope to see you again for your next comic quest.</p>
            <p>Greetings from KapowVerse</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email address.</p>
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
