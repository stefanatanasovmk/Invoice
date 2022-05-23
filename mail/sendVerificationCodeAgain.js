const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendVerificationCodeAgain = (recepient, subject, code) => {
     const msg = {
          to: recepient,
          from: "atanasovstefan@hotmail.com",
          subject: subject,
          text: `Кодот за верификација на вашиот профил е ${code}`
     }
     try {
          sgMail.send(msg)
          return true
     } catch {
          return false
     }
}

module.exports = sendVerificationCodeAgain