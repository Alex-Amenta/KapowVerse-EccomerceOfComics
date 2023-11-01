const transporter = require("../nodemailer/postEmail");
const path = require("path");
require("dotenv").config();
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
        `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Welcome to KapowVerse</title>
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
                    <h1>Welcome to KapowVerse</h1>
                </div>
                <div class="content">
             <h1>Hi ${data.userName}! </h1><hr/>
          <p>Welcome to our online store of comics, mangas and more!!! At our store we strive to offer you the best shopping experience possible, which is why we have created an easy-to-navigate website. Additionally, our customer service team is at your disposal to resolve any questions or concerns you may have.</p>
          <p>Thank You for registering on KapowVerse! <br/>
          Please copy the following code to activate your account: <br/>
          <p>${data.activationToken}</p> <br/>
          <a href="${ruta}/activate/${data.activationToken}">Alternatively click here to activate account</a></p>
          <p>Thank you for choosing us! <br/>
          if you have any questions, please email us at <b>kapowverse@gmail.com</b></p>
          <p><b>Sincerely, <br/>
          Your KapowVerse Team</b></p>
                </div>
                <div class="footer">
                <p> This is an automatic message, please do not reply to this email address.</p>
            </div>
            </div>
        </body>
        </html> 
           `
      };
      break;
    case "Resend":
      emailOptions = {
        from: "kapowverse@gmail.com",
        to,
        subject: "Welcome to KapowVerse",
        html:
        `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Welcome to KapowVerse</title>
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
                    <h1>Welcome to KapowVerse</h1>
                </div>
                <div class="content">
                <h1> Hi ${data.userName}! </h1><hr/>
                <p>Please click the link below to activate your account.</p>
                (Or copy the following code): <br/>
                <p>${data.activationToken}</p> <br/>
                <a href="${ruta}/activate/${data.activationToken}">Activate!</a></p>
                
                <p>Thank you for choosing us! <br/>
                if you have any questions, please email us at <b>kaopwverse@gmail.com</b></p>
                <p><b>Sincerely, <br/>
                Your KapowVerse Team</b></p>
                </div>
                <div class="footer">
                <p> This is an automatic message, please do not reply to this email address.</p>
            </div>
            </div>
        </body>
        </html>
          `
      };
      break;
      
      case "Reset":
        emailOptions = {
          from: "kapowverse@gmail.com",
          to,
          subject: "Reset Your KapowVerse Password!",
          html:
          `<!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <title>Reset Your KapowVerse Password!</title>
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
                      <h1>Reset Your KapowVerse Password</h1>
                  </div>
                  <div class="content">
                  <h1> Hi ${data.userName}! </h1><hr/>
                  <h1> Reset Your KapowVerse Password </h1><hr/>
                  <p>Click the button below to reset your password:</p>
                  <a href="${ruta}/reset-password">Reset Password</a>
                  <br/>
                  Or copy the following code: <br/>
                  <p>${data.token}</p> <br/>
                  <p>If you didn't request this, please ignore this email.</p>
                  </div>
                  <div class="footer">
                  <p> This is an automatic message, please do not reply to this email address.</p>
              </div>
              </div>
          </body>
          </html>
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
