import React from "react"
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { IconButton } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
export default function InvoicesTableRow({ id, client, paymentDate, priceWithoutVAT, VAT, total, payed, changePaymentStatus, deleteInvoice }) {
     let payedStyle = { backgroundColor: "#aeff78" }
     let unpayedStyle = { backgroundColor: "#fc5151" }
     let rightBorder = { borderRight: "2px solid black" }

     const handlechangePaymentStatus = (id) => {
          return () => {
               changePaymentStatus(id)
          }
     }
     const handleDeleteInvoice = (id) => {
          return () => {
               deleteInvoice(id)
          }
     }
     let navigate = useNavigate()
     const handleRouteChange = () => {
          navigate(`/invoice/${id}`)
     }
     return (
          <div className="InvoiceRow" style={payed ? payedStyle : unpayedStyle} >
               <div style={rightBorder} className="td seeInvoice"><IconButton onClick={handleRouteChange}><ManageSearchSharpIcon /></IconButton></div>
               <div style={rightBorder} className="td client">{client}</div>
               <div style={rightBorder} className="td paymentDate">{paymentDate}</div>
               <div style={rightBorder} className="td priceWithoutVAT">{parseInt(priceWithoutVAT).toFixed(1)}</div>
               <div style={rightBorder} className="td VAT">{parseInt(VAT).toFixed(1)}</div>
               <div style={rightBorder} className="td total">{parseInt(total).toFixed(1)}</div>
               <div style={rightBorder} className="td payed">
                    <IconButton onClick={handlechangePaymentStatus(id)}>
                         {payed ? <HighlightOffSharpIcon /> : <CheckCircleOutlineSharpIcon />}
                    </IconButton>
               </div>
               <div className="td delete">
                    <IconButton onClick={handleDeleteInvoice(id)}>
                         <DeleteSharpIcon />
                    </IconButton>
               </div>
          </div>
     )
}