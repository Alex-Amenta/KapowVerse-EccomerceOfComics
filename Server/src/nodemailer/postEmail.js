const nodemailer = require("nodemailer");

const { NODEMAILER_HOST, NODEMAILER_PORT, EMAIL_EMPRESA, PASSWORD_EMAIL } =
  process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  // secure: true,
  auth: {
    user: "kapowverse@gmail.com",
    pass: "hwjf cphd vzzr zukn",
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});

// console.log(transporter)
module.exports = transporter;