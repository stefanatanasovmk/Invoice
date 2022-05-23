const express = require("express")
const router = express.Router()
const User = require("../models/User")
const WrapError = require("../helpers/WrapError")
const randomstring = require("randomstring")
const bcrypt = require("bcrypt")
const sendChangePasswordLink = require("../mail/sendChangePasswordLink")
const PasswordRecovery = require("../models/PasswordRecovery")

router.post("/api/changepassword", async (req, res) => {
     try {
          const { email } = req.body
          const user = await User.findOne({ username: email })
          if (user) {
               const code = randomstring.generate({
                    length: 30,

               });
               bcrypt.hash(code, 12, async (err, hash) => {
                    const passRecovery = new PasswordRecovery({
                         hash: hash, user: user
                    })
                    user.passwordRecovery = passRecovery
                    await user.save()
                    await passRecovery.save()
               })
               sendChangePasswordLink(user.username, "Промена на лозинка", code)

          }
          res.status(200).json({ msg: "Доколку корисникот постои, испративме емаил за промена на лозинката" })
     } catch (e) {
          res.status(200).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
     }

})
router.post("/api/changepassword/:id", WrapError(async (req, res, next) => {
     const { email, password1, password2, code } = req.body
     const user = await User.findOne({ username: email }).populate("passwordRecovery")
     if (user) {
          const { hash } = user.passwordRecovery
          const isMatching = await bcrypt.compare(code, hash)
          if (isMatching && password1 === password2) {
               if (password1.length <= 7) {
                    res.status(400).json({ msg: "Лозинката треба да содржи 8 или повеќе карактери" })
               } else {
                    await user.setPassword(password1)
                    await user.save()
                    await PasswordRecovery.findByIdAndDelete(user.passwordRecovery.id)
                    res.status(200).json({ msg: "Лозинката е променета" })
               }
          } else {
               res.status(400).json({ msg: "Погрешен код или лозинката не се совпаѓа" })
          }
     } else {
          res.status(404).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
     }

}))


module.exports = router