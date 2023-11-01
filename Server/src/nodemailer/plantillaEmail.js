const transporter = require("../nodemailer/postEmail");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { FRONT_HOST, FE_DEPLOY, DEV} = process.env;
let ruta;
if (DEV && DEV === "development") 
	ruta = FRONT_HOST; 
else ruta = FE_DEPLOY;

const sendEmailConPlantilla = (to, template, data) => {

  let emailOptions;
  switch (template) {
    case "User":
      emailOptions = {
        from: "kapowverse@gmail.com",
        to,
        subject: "Welcome to KapowVerse",
        html:
        //   <h1> Welcome to KapowVerse ${data.userName}! </h1><hr/>
        //   <p>Welcome to our online store of comics, mangas and more!!! At our store we strive to offer you the best shopping experience possible, which is why we have created an easy-to-navigate website. Additionally, our customer service team is at your disposal to resolve any questions or concerns you may have.</p>
        //   <p>Thank You for registering on KapowVerse! <br/>
        //   Please copy the following code to activate your account: <br/>
        //   <p>${data.activationToken}</p> <br/>
        //   <a href="${ruta}/activate/${data.activationToken}">Alternatively click here to activate account</a></p>
        //   <p>Thank you for choosing us! <br/>
        //   if you have any questions, please email us at <b>kaopwverse@gmail.com</b></p>
        //   <p><b>Sincerely, <br/>
        //   Your KapowVerse Team</b></p>
           `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitinal//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-TRNASITIONAL.DTD">
          <html XMLNS="http://www.w3.org/1999/html">
            <head>
              <meta http-equiv="Content-Type" content="text/html;charset= utf-8" />
              <meta http-equiv="X-UA-Tompatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, inital-scale=1.0" />

                  <title>Welcome!</title>
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
                                                      <img src="ruta_a_tu_logo.png" alt="KapowVerse">
                                                  </td>
                                                  <td style="width: 50%; text-align: right;" class="social-icons">
                                                      <a href="https://www.instagram.com/"><img src="ruta_a_icono_instagram.png" alt="Instagram"></a>
                                                      <a href="https://x.com/"><img src="ruta_a_icono_twitter.png" alt="Twitter"></a>
                                                      <a href="https://www.facebook.com/"><img src="ruta_a_icono_facebook.png" alt="Facebook"></a>
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
                                        <h2>ACTIVATE YOUR ACCOUNT</h2>
                                        <p>Click the button below to activate your account. <br/>
                                        <a href="${ruta}/activate/${data.activationToken}">Activate account</a>
                                        <br/>
                                        Or copy the following code: <br/>
                                        <p>${data.activationToken}</p> <br/>
                                        </p>
                                      </td>
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
      break;
    case "Resend":
      emailOptions = {
        from: "kapowverse@gmail.com",
        to,
        subject: "Activate your KapowVerse account!",
        html:
          `<h1> Welcome to KapowVerse ${data.userName}! </h1><hr/>
          <p>Please click the link below to activate your account.</p>
          (Or copy the following code): <br/>
          <p>${data.activationToken}</p> <br/>
          <a href="${ruta}/activate/${data.activationToken}">Activate!</a></p>
          
          <p>Thank you for choosing us! <br/>
          if you have any questions, please email us at <b>kaopwverse@gmail.com</b></p>
          <p><b>Sincerely, <br/>
          Your KapowVerse Team</b></p>
          `
      };
      break;
      case "Reset":
        emailOptions = {
          from: "kapowverse@gmail.com",
          to,
          subject: "Reset Your KapowVerse Password!",
          html:`
          <h1> Reset Your KapowVerse Password </h1><hr/>
          <p>Click the button below to reset your password:</p>
          <a href="${ruta}/reset-password">Reset Password</a>
          <br/>
          Or copy the following code: <br/>
          <p>${data.token}</p> <br/>
          <p>If you didn't request this, please ignore this email.</p>
        `
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
