const transporter = require("../nodemailer/postEmail");


const sendEmail = (to, subject, html) => {
    console.log("Sending email...");
    let emailOptions = {
      from: "pagetimeyou@gmail.com",
      to,
      subject,
      html:
        html ||
        `<h1>Email Prueba</h1> <p>Este es un email de prueba enviado a <b>${to}</b> usando la librería Nodemailer.`
        
    };
    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.log("Email error: ", error.message);
        } else {
          console.log("Email enviado 📧");
        }
      });
    };

    module.exports = sendEmail;