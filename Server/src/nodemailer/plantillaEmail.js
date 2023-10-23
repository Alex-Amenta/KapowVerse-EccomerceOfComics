const transporter = require("../nodemailer/postEmail");


const sendEmailConPlantilla = (to, template, data) => {

  let emailOptions;
  switch (template) {
    case "User":
      emailOptions = {
        from: "kapowverse@gmail.com",
        to,
        subject: "Welcome to KapowVerse",
        html:
          `<h1> Welcome to KapowVerse ${data.userName}! </h1><hr/>
          <p>Welcome to our online store of comics, mangas and more!!! At our store we strive to offer you the best shopping experience possible, which is why we have created an easy-to-navigate website. Additionally, our customer service team is at your disposal to resolve any questions or concerns you may have.</p>
          <p>Thank You for registering on KapowVerse! <br/>
          if you have any questions, please email us at <b>kaopwverse@gmail.com</b></p>
          <p><b>Sincerely, <br/>
          Your KapowVerse Team</b></p>
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
