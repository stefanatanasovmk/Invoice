const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./User")
const PasswordRecoverySchema = new Schema({
     hash: String,
     user: {
          type: Schema.Types.ObjectId,
          ref: "User"
     },
     createdAt: {
          type: Date,
          default: Date.now,
          expires: 3600
     },

})
module.exports = mongoose.model("PasswordRecovery", PasswordRecoverySchema)

