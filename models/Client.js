const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClientSchema = new Schema({
     name: String,
     address: String,
     tel: String,
     email: String,
     invoices: [{
          type: Schema.Types.ObjectId,
          ref: "Invoice"
     }],
     user: {
          type: Schema.Types.ObjectId,
          ref: "User"
     }
},
     { timestamps: true })

module.exports = mongoose.model("Client", ClientSchema)