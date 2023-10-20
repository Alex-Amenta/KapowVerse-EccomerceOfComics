const nodemailer = require("nodemailer");

const { NODEMAILER_HOST, NODEMAILER_PORT, EMAIL_EMPRESA, PASSWORD_EMAIL } =
  process.env;

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true,
  auth: {
    user: EMAIL_EMPRESA,
    pass: PASSWORD_EMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
console.log(transporter)
module.exports = transporter;