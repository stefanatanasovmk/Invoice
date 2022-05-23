import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import "./Home.css"
import InvoicesTableHeader from "./InvoicesTableHeader";
import InvoicesTableRow from "./InvoicesTableRow";
import axios from "axios"
import calculateTotal from "../../functions/calculateTotal";
import Loader from "../../Loader"
import Context from "../../context/Context";
import DateFnsAdapter from "@date-io/date-fns";


export default function Home() {
     const { flashPopUp } = useContext(Context)
     const [invoices, setInvoices] = useState([])
     const [isLoading, setIsLoading] = useState(true)
     const [unpayedInvoices, setUnpayedInvoices] = useState(0)
     const [totalVAT, setTotalVAT] = useState(0)
     const [totalUnpayed, setTotalUnpayed] = useState(0)
     const [totalPayed, setTotalPayed] = useState(0)
     const [totalWithoutVAT, setTotalWithoutVAT] = useState(0)

     const dateFns = new DateFnsAdapter()

     useEffect(() => {
          axios.get("/api/allinvoices")
               .then(res => setInvoices(res.data))
               .catch(e => flashPopUp("warning", e.response.data.msg))
          setIsLoading(false)
     }, [])
     useEffect(() => {
          const allTotals = calculateTotal(invoices, "totalVAT")
          const { totalVAT, totalUnpayed, unpayed, totalPayed, totalWithoutVAT } = allTotals
          setTotalVAT(totalVAT)
          setTotalUnpayed(totalUnpayed)
          setUnpayedInvoices(unpayed)
          setTotalWithoutVAT(totalWithoutVAT)
          setTotalPayed(totalPayed)

     }, [invoices])
     const changePaymentStatus = async (id) => {
          const invoiceId = { id: id }
          axios.post("/api/invoicepayed", invoiceId)
               .then(res => {
                    setInvoices(invoices.map(e => e._id === id ? { ...e, payed: res.data.isPayed } : e))
                    flashPopUp("success", res.data.msg)
               })
               .catch(e => flashPopUp("error", e.response.data.msg))

     }
     const deleteInvoice = async (id) => {
          const invoiceId = { id: id }
          axios.post("/api/deleteinvoice", invoiceId)
               .then(res => {
                    setInvoices(invoices.filter(e => e._id !== id))
                    flashPopUp("success", res.data.msg)
               })
               .catch(e => flashPopUp("error", e.response.data.msg))
     }
     return (
          <div className="Home">
               {!isLoading ?
                    <React.Fragment>
                         <div className="Cards">
                              <Card className="Cards" cardFor={"Ненаплатени фактури"} number={unpayedInvoices} />
                              <Card className="Cards" cardFor={"Вкупно данок"} number={totalVAT} />
                              <Card className="Cards" cardFor={"Вкупно ненаплатено"} number={totalUnpayed} />
                              <Card className="Cards" cardFor={"Вкупно наплатено"} number={totalPayed} />
                              <Card className="Cards" cardFor={"Вкупно без ДДВ"} number={totalWithoutVAT} />
                         </div>
                         <div className="InvoicesTable">
                              <InvoicesTableHeader />

                         </div>
                         {invoices.map(e =>
                              < InvoicesTableRow id={e._id} key={e._id}
                                   client={e.clientInfo && e.clientInfo.name}
                                   paymentDate={dateFns.format(Date.parse(e.invoiceInfo.paymentDate), "keyboardDate")}
                                   priceWithoutVAT={e.total.totalWithoutVAT}
                                   VAT={e.total.totalVAT} total={e.total.total} payed={e.payed} changePaymentStatus={changePaymentStatus} deleteInvoice={deleteInvoice} />)
                         }
                    </React.Fragment>
                    :
                    <Loader />
               }
          </div>
     )
}