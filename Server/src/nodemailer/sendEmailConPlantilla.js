const transporter = require("../nodemailer/postEmail");


const sendEmailConPlantilla = (to, template, data) => {

let emailOptions;
    switch(template) {
        case "newUser": 
         emailOptions = {
            from: "pagetimeyou@gmail.com",
            to,
            subject: "Bienvenido a timeYou",
            html: 
          `<h1> Bienvenido a timeYou </h1>.<p>¡Bienvenido/a a nuestra tienda en línea de relojes! Nos complace que nos hayas encontrado entre la gran cantidad de opciones que existen en internet. Aquí encontrarás una amplia variedad de relojes de calidad, desde los más clásicos y elegantes hasta los más modernos y deportivos. En nuestra tienda nos esforzamos por ofrecerte la mejor experiencia de compra posible, por lo que hemos creado un sitio web fácil de navegar y con toda la información que necesitas para tomar la mejor decisión al elegir tu reloj. Además, nuestro equipo de atención al cliente está a tu disposición para resolver cualquier duda o inquietud que puedas tener.`         
        };
          break; 
          default:
            emailOptions = {
              from: "timeOut",
              to,
              subject: "Prueba de envio de mensajes",
              html: "<h1> Esto es un mensaje de prueba</h1>",
            };
            break;
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
