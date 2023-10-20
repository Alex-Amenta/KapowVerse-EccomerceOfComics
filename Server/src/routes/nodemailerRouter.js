const { Router } = require("express");
const transporter = require("../../config/nodemailer");
// const getUserByEmail = require("../handlers/user/userHandler")

const nodemailerRouter = Router();

nodemailerRouter.post("/", async (req, res) => {
  const { email, name } = req.body;

  await transporter.semdMail({
    from: "Mensaje enviado por <kapowverse@gmail.com>",
    to: email,
    subject: "Mensaje enviado desde KapowVerse",

    html: `
<h1>${name} ¡Bienvenido a KapowVerse!</h1>

<p>¡Bienvenido/a a nuestra tienda en línea de comics y mangas! Nuestro equipo de atención al cliente está a tu disposición para resolver cualquier duda o inquietud que puedas tener.     

    <button>Ingresar a la pagina/button>
    
    

`,
  });
});

module.exports = nodemailerRouter;
