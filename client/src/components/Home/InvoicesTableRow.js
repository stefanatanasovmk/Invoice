import React from "react"
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InvoicesTableRow({ id, client, paymentDate, priceWithoutVAT, VAT, total, payed, changePaymentStatus, deleteInvoice }) {
     let payedStyle = { backgroundColor: "#aeff78" }
     let unpayedStyle = { backgroundColor: "#fc5151" }


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
          <div className="InvoiceRow TableDataRow" style={payed ? payedStyle : unpayedStyle} >
               <div className="td seeInvoice borderOnDesktop"><IconButton onClick={handleRouteChange}><ManageSearchSharpIcon /></IconButton></div>
               <div className="td client borderOnDesktop">{client}</div>
               <div className="td paymentDate borderOnDesktop">{paymentDate}</div>
               <div className="td priceWithoutVAT borderOnDesktop">{parseInt(priceWithoutVAT).toFixed(1)}</div>
               <div className="td VAT borderOnDesktop">{parseInt(VAT).toFixed(1)}</div>
               <div className="td total borderOnDesktop">{parseInt(total).toFixed(1)}</div>
               <div className="td payed borderOnDesktop">
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