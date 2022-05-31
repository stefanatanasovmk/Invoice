import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import InvoiceTable from "./InvoiceTable";
import ClientAndInvoiceInfo from "./ClientAndInvoiceInfo"
import CompanyInfo from "./CompanyInfo"
import "../../style/Invoice.css"
import { Button } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"
import areRowsCalculated from "../../functions/areRowsCalculated";
import PrintIcon from '@mui/icons-material/Print';
import useToggle from "../../hooks/useToggle";
import Loader from "../../Loader";
import { is } from "date-fns/locale";
export default function Invoice() {
     const { flashPopUp, user } = useContext(Context)
     const [isLoading, setIsLoading] = useToggle(true)
     let navigate = useNavigate()
     const { id } = useParams()
     const [fetchedProductsData, setFetchedProductsData] = useState([])
     const [fetchedInvoiceData, setFetchedInvoiceData] = useState({})
     const [allRowsData, setAllRowsData] = useState([])
     const [clientAndInvoiceData, setClientAndInvoiceData] = useState("")
     const [allTotals, setAllTotals] = useState("")
     const [rowsStatus, setRowsStatus] = useState([])
     const isRowEditing = (state, id) => {
          const rowState = { state, id }
          setRowsStatus(pre => [...pre.filter(e => e.id !== id), rowState])
     }
     const isRowDeleted = (id) => {
          setRowsStatus(pre => [...pre.filter(e => e.id !== id)])
     }

     const getAllTotals = (data) => {
          setAllTotals(data)
     }
     const getRowData = (rowData) => {
          setAllRowsData([...allRowsData, rowData])
     }
     const removeRowData = (rowId) => {
          setAllRowsData([...allRowsData.filter(e => e.id !== rowId)])
     }
     const getClientAndInvoiceData = (data) => {
          setClientAndInvoiceData(data)
     }
     const saveNewInvoice = async () => {
          const data = { allRowsData, allTotals, clientAndInvoiceData }
          const isFinnished = areRowsCalculated(rowsStatus)
          if (isFinnished) {
               axios.post("/api/savenewinvoice", data)
                    .then(res => {
                         navigate(`/invoice/${res.data.id}`)
                         flashPopUp("success", res.data.msg)
                    })
                    .catch((e) => {
                         flashPopUp("error", e.response.data.msg)
                    })

          } else {
               flashPopUp("warning", "Ве молиме потврдете ги сите артикли во фактурата, или додајте артикл")
          }
     }
     const saveEditedInvoice = async () => {
          const { _id } = fetchedInvoiceData
          const data = { allRowsData, allTotals, _id, clientAndInvoiceData }
          const isFinnished = areRowsCalculated(rowsStatus)
          if (isFinnished) {
               axios.post("/api/saveeditedinvoice", data).then(res => flashPopUp("success", res.data.msg))
                    .catch(e => flashPopUp("error", e.response.data.msg))
          } else {
               flashPopUp("warning", "Ве молиме потврдете ги сите артикли во фактурата, или додајте артикл")
          }
     }
     const getSavedInvoice = async () => {
          if (id) {
               setRowsStatus([])
               axios.get(`/api/getinvoice/${id}`)
                    .then((res) => {
                         setFetchedProductsData(res.data.products)
                         setFetchedInvoiceData(res.data)
                         setRowsStatus([])
                         setIsLoading()
                    })
                    .catch((e) => {
                         flashPopUp("error", e.response.data.msg)
                         setIsLoading()
                    })
          } else {
               setIsLoading()
          }
     }

     useEffect(() => {
          getSavedInvoice()
     }, [])
     const companyInfo = {
          name: user.companyName, address: user.address, telephone: user.tel, mail: user.username, bankAcc: user.bankAccount, tax: user.taxNumber,
          logo: user.logo.path
     }
     const handlePrint = () => {
          const isFinnished = areRowsCalculated(rowsStatus)
          if (isFinnished) {
               window.print()
          } else {
               flashPopUp("warning", "Ве молиме потврдете ги сите артикли во фактурата, или додајте артикл")
          }
     }
     return (
          <div className="Invoice">
               {isLoading ?
                    <Loader />
                    :
                    <>
                         <Context.Provider value={{ getRowData, removeRowData, companyInfo, isRowEditing, isRowDeleted }}>
                              <CompanyInfo companyInfo={companyInfo} />
                              <ClientAndInvoiceInfo
                                   getClientAndInvoiceData={getClientAndInvoiceData}
                                   flashPopUp={flashPopUp} fetchedInvoiceData={fetchedInvoiceData}
                                   id={id} />
                              <InvoiceTable
                                   products={fetchedProductsData}
                                   getAllTotals={getAllTotals}
                                   setRowsStatus={setRowsStatus}
                              />
                         </Context.Provider>
                         {id ?
                              <>
                                   <div className="BottomBtns" >
                                        <Button onClick={saveNewInvoice} variant="contained" size="small" color="success" endIcon={<SaveOutlinedIcon />}>Зачувај како нова фактура</Button>
                                        <Button onClick={handlePrint} variant="contained" size="small" endIcon={<PrintIcon />}>Принт</Button>
                                        <Button onClick={saveEditedInvoice} variant="contained" size="small" color="secondary" endIcon={<SaveOutlinedIcon />}>Зачувај ја промената</Button>
                                   </div>

                              </>
                              :
                              <div className="SaveBtnDiv" >
                                   {/* Print CSS is styled in Invoice.css */}
                                   {/* <Button onClick={handlePrint} variant="contained" size="small" endIcon={<PrintIcon />}>Принт</Button> */}
                                   <Button onClick={saveNewInvoice} variant="contained" color="success" className="button" size="small" endIcon={<SaveOutlinedIcon />}>Зачувај</Button>
                              </div>
                         }
                    </>
               }
          </div >
     )
}
