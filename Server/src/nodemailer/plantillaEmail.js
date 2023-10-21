const transporter = require("../nodemailer/postEmail");


const sendEmailConPlantilla = (to, template, data) => {

let emailOptions;
    switch(template) {
        case "User": 
         emailOptions = {
            from: "kaopwverse@gmail.com",
            to,
            subject: "Bienvenido a KapowVerse",
            html: 
          `<h1> Bienvenido a KapowVerse </h1>.<p>¡Bienvenido/a a nuestra tienda en línea de comics, mangas y mas!!! En nuestra tienda nos esforzamos por ofrecerte la mejor experiencia de compra posible, por lo que hemos creado un sitio web fácil de navegar. Además, nuestro equipo de atención al cliente está a tu disposición para resolver cualquier duda o inquietud que puedas tener.`         
        };
        

        }
        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
              console.log("Email error: ", error.message);
            } else {
              console.log("Correo enviado correctamente 📧");
            }
          }); 
    };
  

module.exports = sendEmailConPlantilla;
