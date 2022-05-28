const mongoose = require("mongoose")
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
     user: {
          type: Schema.Types.ObjectId,
          ref: "User"
     },
     clientInfo: {
          type: Schema.Types.ObjectId,
          ref: "Client"
     },
     invoiceInfo: {
          invoiceNumber: String,
          executionDate: Date,
          issuingDate: Date,
          paymentDate: Date
     },
     products: {
          type: Array,
          trim: true
     },
     total: {
          totalWithoutVAT: String,
          totalVAT: String,
          total: String
     },
     payed: {
          type: Boolean,
          default: false
     }
},
     { timestamps: true }
)



module.exports = mongoose.model("Invoice", InvoiceSchema)