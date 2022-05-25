const express = require("express")
const mongoose = require("mongoose")
const app = express()
const session = require("express-session")
const passport = require("passport")
const User = require("./models/User")
const LocalStrategy = require("passport-local")
const MongoStore = require("connect-mongo")

// const cors = require("cors")


// app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionConfg = {
     secret: "secret",
     resave: false,
     saveUninitialized: false,
     cookie: {
          httpOnly: true,
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
          maxAge: 1000 * 60 * 60 * 24 * 7
     },
     store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/faktura" })
}
app.use(session(sessionConfg))
//Passport middlewares
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const loginSignup = require("./routes/loginsignup")
app.use("/", loginSignup)
const invoices = require("./routes/invoices")
app.use("/", invoices)
const verify = require("./routes/verify")
app.use("/", verify)
const changePassword = require("./routes/changePassword")
app.use("/", changePassword)
const clients = require("./routes/clients")
app.use("/", clients)
const user = require("./routes/user")
const WrapError = require("./helpers/WrapError")
app.use("/", user)


app.get("/api/isauthenticated", async (req, res) => {
     req.isAuthenticated() ? res.json({ status: true, user: req.user }) : res.json({ status: false })
})

<<<<<<< HEAD
app.get('/*', (req, res) {
 res.redirect("/")
=======
app.get('/*', (req, res) => {
     res.redirect("/")
>>>>>>> 61520b59db601a8b1a739ff65fdf4167b72bcac9
})

app.all("*", WrapError((req, res) => {
     throw Error()
}))

app.use((err, req, res, next) => {
     if (err) {
          res.status(404).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
     } else {
          next()
     }
})



//SERVERS 
app.listen(4000, () => {
     console.log("Express works on 4000")
})

mongoose.connect("mongodb://localhost:27017/faktura")
try {
     console.log("mongoose works on faktura")
} catch (e) {
     console.log("Mongoose dont work", e)
}
