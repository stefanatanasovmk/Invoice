const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendChangePasswordLink = (recepient, subject, code) => {
     const msg = {
          to: recepient,
          from: "atanasovstefan@hotmail.com",
          subject: subject,
          text: `За да го променете вашиот пасворд, копирајте го следниов код „${code}“ ,кодот е валиден 1 час.`
     }
     try {
          sgMail.send(msg)
          return true
     } catch {
          return false
     }
}

module.exports = sendChangePasswordLink