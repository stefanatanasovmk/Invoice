const express = require("express")
const router = express.Router()
const Invoice = require("../models/Invoice")
const WrapError = require("../helpers/WrapError")
const isAuthenticated = require("../helpers/isAuthenticated")
const Client = require("../models/Client")
const isInvoiceAuthor = require("../helpers/isInvoiceAuthor")
const User = require("../models/User")

//Fetch all invoices
router.get("/api/allinvoices/", isAuthenticated, WrapError(async (req, res) => {
     const invoices = await Invoice.find({ user: req.user.id }).populate("clientInfo")
     res.status(200).json(invoices)

}))
//Get Saved Invoice
router.get("/api/getinvoice/:id", isAuthenticated, WrapError(async (req, res, next) => {
     const { id } = req.params
     const invoice = await Invoice.findById(id).populate("clientInfo")
     if (req.user.id == invoice.user) {
          res.status(200).json(invoice)
     } else {
          throw Error()
     }
}))
//SaveNewInvoice
router.post("/api/savenewinvoice", isAuthenticated, WrapError(async (req, res) => {
     const user = await User.findById(req.user.id)
     const { clientName, address, tel, email, invoiceNumber, dateOfExecution, dateOfIssuing, paymentDate } = req.body.clientAndInvoiceData
     const { allRowsData, allTotals } = req.body
     const newInvoice = new Invoice({
          products: allRowsData,
          total: {
               totalWithoutVAT: allTotals.allTotalWithoutVAT,
               totalVAT: allTotals.allTotalVAT,
               total: allTotals.allTotal
          },
          user: user.id,
          invoiceInfo: {
               invoiceNumber: invoiceNumber,
               executionDate: dateOfExecution,
               issuingDate: dateOfIssuing,
               paymentDate: paymentDate
          }
     })
     if (clientName) {
          const isClientExist = await Client.findOne({ name: clientName })

          if (!isClientExist) {
               const client = new Client({
                    name: clientName,
                    address: address,
                    tel: tel,
                    email: email,
                    user: user.id,
               })
               client.invoices.push(newInvoice.id)
               await client.save()
               newInvoice.clientInfo = client.id
          }
          else {
               newInvoice.clientInfo = isClientExist.id
          }
     }
     await newInvoice.save()
     user.invoices.push(newInvoice.id)
     await user.save()
     res.status(200).json({ id: newInvoice.id, msg: "Креирана е нова фактура" })
}))
//Save edited Invoice
router.post("/api/saveeditedinvoice", isAuthenticated, WrapError(async (req, res) => {
     const { _id, allRowsData, allTotals } = req.body
     const { clientName, address, tel, email, invoiceNumber, dateOfExecution, dateOfIssuing, paymentDate } = req.body.clientAndInvoiceData
     const user = req.user
     const invoice = await Invoice.findByIdAndUpdate(_id, {
          products: allRowsData,
          total: {
               totalWithoutVAT: allTotals.allTotalWithoutVAT,
               totalVAT: allTotals.allTotalVAT,
               total: allTotals.allTotal
          },
          invoiceInfo: {
               invoiceNumber: invoiceNumber,
               executionDate: dateOfExecution,
               issuingDate: dateOfIssuing,
               paymentDate: paymentDate
          }
     })
     if (clientName) {
          const isClientExist = await Client.findOne({ name: clientName })
          if (!isClientExist) {
               const client = new Client({
                    name: clientName,
                    address: address,
                    tel: tel,
                    email: email,
                    user: user.id,
               })
               client.invoices.push(invoice.id)
               await client.save()
               invoice.clientInfo = client.id
               await invoice.save()
          }
          else {
               isClientExist.address = address
               isClientExist.tel = tel
               isClientExist.email = email
               if (invoice.clientInfo != isClientExist.id) {
                    isClientExist.invoices.push(invoice.id)
               }
          }
     } res.status(200).json({ msg: "Промените се зачувани" })
}))



//InvoicePayed
router.post("/api/invoicepayed", isAuthenticated, WrapError(async (req, res) => {
     const { id } = req.body
     const invoice = await Invoice.findById(id)
     if (invoice.user == req.user.id) {
          if (invoice.payed) {
               invoice.payed = false
          } else {
               invoice.payed = true
          }
          invoice.save()
          res.status(200).json({ isPayed: invoice.payed, msg: "Промените се зачувани" })
     } else {
          res.status(404).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
     }

}))

//DeleteInvoice
router.post("/api/deleteinvoice", isAuthenticated, WrapError(async (req, res) => {
     const { id } = req.body
     const invoice = await Invoice.findById(id)
     if (req.user.id == invoice.user) {
          const user = await User.findById(invoice.user)
          const newInvoiceList = user.invoices.filter(e => e != invoice.id)
          user.invoices = newInvoiceList
          await user.save()
          await Invoice.findByIdAndDelete(id)

          res.status(200).json({ msg: "Фактурата е избришана" })
     } else {
          res.status(404).json({ msg: "Настана грешка, ве молиме обидете се повторно" })
     }

}))



module.exports = router