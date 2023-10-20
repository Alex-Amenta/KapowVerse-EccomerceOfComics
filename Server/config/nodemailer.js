const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kapowverse@gmail.com",
        pass: "hwjf cphd vzzr zukn"
    },

})

transporter
.verify().then(() =>console.log("gmail enviado con exito")).catch(error => console.error(error))

module.exports = transporter;

/*
const nodemailer = require('nodemailer');
const nodemailerNTLMAuth = require('nodemailer-ntlm-auth');

let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true,
    auth: {
        type: 'custom',
        method: 'NTLM',
        user: 'username',
        pass: 'verysecret',
        options: {
            domain: 'my-domain',
            workstation: 'my-desktop'
        }
    },
    customAuth: {
        NTLM: nodemailerNTLMAuth
    }
});

transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'hello world!',
    text: 'hello!'
}, console.log)

*/