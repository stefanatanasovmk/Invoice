const Invoice = require("../models/Invoice")

const isInvoiceAuthor = async (req, res, next) => {
     const invoice = await Invoice.findById(req.params.id)

     if (req.user.id == invoice.user) {
          next()
     } else {
          throw Error()

     }
}

module.exports = isInvoiceAuthor