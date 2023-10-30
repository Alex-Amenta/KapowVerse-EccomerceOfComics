const transporter = require("../nodemailer/postEmail");
const logoOficial = require ("../../../Client/src/assets/logo-navbar.png")
import naruto from "../../assets/naruto-alert.png";
const sendEmailConPlantilla = (to, template, data) => {

  let emailOptions;
  switch (template) {
    case "User":
      emailOptions = {
        from: "kapowverse@gmail.com",
        to,
        subject: "Welcome to KapowVerse",
        html:
          `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitinal//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-TRNASITIONAL.DTD">
          <html XMLNS="http://www.w3.org/1999/html">
            <head>
              <meta http-equiv="Content-Type" content="text/html;charset= utf-8" />
              <meta http-equiv="X-UA-Tompatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, inital-scale=1.0" />

                  <title>Bienvenido a nuestra página de comics</title>
                  <style>
                      body {
                          background-color: #e8e8e8;
                          font-family: "Bangers", sans-serif;
                      }
              
                      table {
                          width: 100%;
                          border-collapse: collapse;
                      }
              
                      table.container {
                          width: 600px;
                          margin: 0 auto;
                          background-color: #fff;
                          padding: 20px;
                          border-radius: 5px;
                          color: #212121;
                      }
              
                      table.header {
                          width: 100%;
                      }
              
                      table.header img {
                          max-width: 100px;
                      }
              
                      table.header a {
                          text-decoration: none;
                          color: #212121;
                      }
              
                      table.features {
                          width: 100%;
                      }
              
                      table.feature {
                          width: 33.33%;
                          text-align: center;
                      }
              
                      .social-icons a {
                          display: inline-block;
                          margin-right: 10px;
                      }
              
                      .social-icons img {
                          max-width: 30px;
                          vertical-align: middle;
                      }
              
                      h1, h2 {
                          font-weight: 1000;
                          font-size: 17px;
                      }
                  </style>
              </head>
              <body>
                  <table width="100%" bgcolor="#000">
                      <tr>
                          <td>
                              <table class="container" align="center" bgcolor="#fff">
                                  <tr>
                                      <td>
                                          <table class="header" width="100%">
                                              <tr>
                                                  <td style="width: 50%; text-align: left;">
                                                      <img src="ruta_a_tu_logo.png" alt="Logo de la página">
                                                  </td>
                                                  <td style="width: 50%; text-align: right;" class="social-icons">
                                                      <a href="enlace_a_instagram"><img src="ruta_a_icono_instagram.png" alt="Instagram"></a>
                                                      <a href="enlace_a_twitter"><img src="ruta_a_icono_twitter.png" alt="Twitter"></a>
                                                      <a href="enlace_a_facebook"><img src="ruta_a_icono_facebook.png" alt="Facebook"></a>
                                                  </td>
                                              </tr>
                                          </table>
                                          <h1>¡WELCOME TO KAPOWVERSE!</h1>
                                          <p>We are excited to have you as part of our community. Here, you will be able to enjoy the best comics.</p>
                                          <p>Thank you for joining us. We hope you have a great time!</p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
              
                      <tr>
                          <td>
                              <table class="container" align="center" bgcolor="#fff">
                                  <tr>
                                      <td class="feature">
                                          <h2>SHOP ONLINE</h2>
                                          <p>We created this page so you can enjoy the comic you love from the comfort of your home with just two simple clicks. </p>
                                      </td>
                                      <td class="feature">
                                          <h2>REVIEWS</h2>
                                          <p>We have a review system in place so you can learn about the opinions of other buyers before purchasing your comics.</p>
                                      </td>
                                      <td class="feature">
                                          <h2>CHAT   24/7</h2>
                                          <p>We are available 24 hours a day to answer your questions and clear any doubts you may have whenever you need it..</p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>
          `
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
