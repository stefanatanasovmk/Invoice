const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/User")
const sendVerificationCode = require("../mail/sendVerificationCode")
const WrapError = require("../helpers/WrapError")
const isEmail = require("../helpers/isEmail")
// sendMail(recepient, msg, subject)
//Register
router.post("/api/signup", async (req, res) => {
     // const sendMail = (recepient, message, subject)
     const { password1, password2, email } = req.body
     try {
          const user = await User.findOne({ username: email })
          if (user) {
               res.status(400).json({ msg: "Корисникот веќе постои, ве молиме најавете се" })
          } else {
               if (password1 === password2 && isEmail(email)) {
                    if (password1.length <= 7) {
                         res.status(400).json({ msg: "Лозинката треба да содржи 8 или повеќе карактери" })
                    } else {
                         const code = sendVerificationCode(email, "Код за верификација",)
                         const user = new User({ username: email })
                         user.companyName = ""
                         user.address = ""
                         user.tel = ""
                         user.bankAccount = ""
                         user.taxNumber = ""
                         user.logo.path = ""
                         await user.setPassword(password1)
                         user.verificationCode = code
                         await user.save()
                         res.status(200).json({ msg: "Успешно се регистриравте, ве молиме најавете се и следете ги упатствата за верификација на вашиот емаил" })
                    }
               } else {
                    res.status(400).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
               }
          }
     } catch {
          res.status(400).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
     }

})
//Login
router.post("/api/login", passport.authenticate('local', { failureMessage: false }), (req, res) => {
     res.status(200).json({ msg: "Успешно се најавивте" })
});

//Logout
router.post("/api/logout", WrapError(async (req, res) => {
     req.logout()
     res.end()
}))

module.exports = router