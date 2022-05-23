const express = require("express")
const router = express.Router()
const User = require("../models/User")
const WrapError = require("../helpers/WrapError")
const isAuthenticated = require("../helpers/isAuthenticated")
const sendVerificationCodeAgain = require("../mail/sendVerificationCodeAgain")
router.post("/api/verify", isAuthenticated, async (req, res, next) => {
     try {
          const user = await User.findById(req.user.id)
          const code = req.body.code.toUpperCase()
          if (code === user.verificationCode) {
               user.verified = true
               user.verificationCode = ""
               await user.save()
               res.status(200).json({ msg: "Успешно го верификувавте вашиот емаил" })
          } else {
               res.status(400).json({ msg: "Ве молиме внесете го кодот што ви го испративме на емаил" })
          }
     } catch (e) {
          next(e)
     }
})

router.get("/api/sendcodeagain", isAuthenticated, WrapError(async (req, res) => {
     const { username, verificationCode } = req.user
     const respond = sendVerificationCodeAgain(username, "Код за верификација", verificationCode)
     res.status(200).json({
          msg: "Ви го испративме вашиот код за верификација повторно"
     })
}))

module.exports = router