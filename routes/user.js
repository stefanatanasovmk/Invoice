const express = require("express")
const router = express.Router()
const User = require("../models/User")
const WrapError = require("../helpers/WrapError")
const isAuthenticated = require("../helpers/isAuthenticated")
const { cloudinary } = require("../helpers/cloudinary")
const { storage } = require("../helpers/cloudinary")
const multer = require('multer')
const upload = multer({ storage })
const sendVerificationCode = require("../mail/sendVerificationCode")
const { application } = require("express")
const Invoice = require("../models/Invoice")
const Client = require("../models/Client")
router.post("/api/companyinfo/:id", isAuthenticated, async (req, res, next) => {
     
     try {
          const { companyName, address, tel, bankAccount, taxNumber } = req.body.data
          const { id } = req.params
          if (req.user.id === id) {
               const user = await User.findById(id)
               user.companyName = companyName
               user.address = address
               user.tel = tel
               user.bankAccount = bankAccount
               user.taxNumber = taxNumber
               await user.save()
          }
          else {
               next()
          }
          res.status(200).json({ msg: "Податоците се успешно зачувани" })
     } catch (e) {
          next(e)
     }
     res.end()
})

router.post("/api/addimage/:id", isAuthenticated, upload.single("image"), async (req, res, next) => {
     try {
          const { id } = req.params
          if (req.user.id === id) {
               const user = await User.findById(id)
               user.logo = req.file.path
               user.save()
               res.status(200).end()
          }
     }
     catch (e) {
          next(e)
     }
})

router.post("/api/changepass/:id", isAuthenticated, WrapError(async (req, res, next) => {
     try {
          if (req.user.id === req.params.id) {
               const { oldPass, newPass } = req.body
               if (newPass.length <= 7) {
                    res.status(400).json({
                         msg: "Лозинката треба да содржи 8 или повеќе карактери"
                    })
               } else {
                    const user = await User.findById(req.user.id)
                    await user.changePassword(oldPass, newPass)
                    res.status(200).json({ msg: "Лозинката е успешно променета" })
               }
          } else {
               throw Error()
          }
     } catch (e) {
          next(e)
     }
}))
router.post("/api/changeemail/:id", isAuthenticated, WrapError(async (req, res, next) => {
     try {
          if (req.params.id == req.user.id) {
               const { email } = req.body
               const user = await User.findById(req.user.id)
               user.username = email
               user.verified = false
               const code = sendVerificationCode(email, "Код за верификација на емаил")
               user.verificationCode = code
               user.save()
               res.status(200).json({ msg: "Успешно го променивте вашиот емаил, сега ве молиме верификувајте го" })
          } else {
               throw Error()
          }
     } catch (e) {
          next(e)
     }
}))

router.post("/api/deleteuser/:id", isAuthenticated, WrapError(async (req, res) => {
     try {
          if (req.user.id == req.params.id) {
               const user = await User.findByIdAndDelete(req.params.id)
               await Invoice.deleteMany({ user: user.id })
               await Client.deleteMany({ user: user.id })
               res.status(200).json({ msg: "Вашиот профил беше успешно избришан" })
          } else {
               throw Error()
          }
     }
     catch (e) {
          next(e)
     }
}))

module.exports = router