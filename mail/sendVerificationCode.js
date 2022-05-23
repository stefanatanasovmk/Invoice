const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const randomstring = require("randomstring")


const sendVerificationCode = (recepient, subject) => {
     const code = randomstring.generate({
          length: 8,
          charset: 'alphabetic',
          capitalization: 'uppercase'
     });
     const msg = {
          to: recepient,
          from: "atanasovstefan@hotmail.com",
          subject: subject,
          text: `Кодот за верификација на вашиот емаил е ${code}`
     }
     sgMail.send(msg)
     return code
}

module.exports = sendVerificationCode