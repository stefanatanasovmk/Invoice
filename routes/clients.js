const express = require("express")
const router = express.Router()
const Client = require("../models/Client")
const WrapError = require("../helpers/WrapError")
const isAuthenticated = require("../helpers/isAuthenticated")


router.get("/api/clients", isAuthenticated, WrapError(async (req, res) => {
     const clients = await Client.find({ user: req.user.id })
     res.status(200).json(clients)
}))

module.exports = router