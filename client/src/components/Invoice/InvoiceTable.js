import React, { useEffect, useState } from "react";
import Row from "./Row"
import Header from "./Header";
import "../../style/InvoiceTable.css"
import Footer from "./Footer";
import { v4 as uuidv4 } from 'uuid';

export default function InvoiceTable({ getAllTotals, products }) {
     const [allTotal, setAllTotal] = useState(0)
     const [allTotalVAT, setAllTotalVAT] = useState(0)
     const [allTotalWithoutVAT, setAllTotalWithoutVAT] = useState(0)
     const plusTotal = (allTotal, totalVAT, totalWithoutVAT) => {
          setAllTotal((prev) => prev + allTotal)
          setAllTotalVAT((prev) => prev + totalVAT)
          setAllTotalWithoutVAT((prev) => prev + totalWithoutVAT)
     }
     const minusTotal = (allTotal, totalVAT, totalWithoutVAT) => {
          setAllTotal((prev) => prev - allTotal)
          setAllTotalVAT((prev) => prev - totalVAT)
          setAllTotalWithoutVAT((prev) => prev - totalWithoutVAT)
     }
     const rowRemove = (id) => {
          setRows(rows => [...rows.filter(e => e.props.id !== id)])
     }
     const resetRows = () => {
          setRows([])
          addRow()
     }
     const [rows, setRows] = useState([<Row plusTotal={plusTotal} minusTotal={minusTotal} rowRemove={rowRemove} id={uuidv4()} key={uuidv4()} rowNum={1} />])

     const addRow = () => {
          setRows(rows => [...rows, <Row plusTotal={plusTotal} minusTotal={minusTotal} rowRemove={rowRemove} id={uuidv4()} key={uuidv4()} rowNum={rows.length + 1} />])
     }

     useEffect(() => {
          if (products.length > 0) {

               setRows(products.map((e, inx) =>
                    <Row plusTotal={plusTotal}
                         minusTotal={minusTotal}
                         rowRemove={rowRemove}
                         id={e.id}
                         key={e.id}
                         rowNum={inx + 1}
                         dbItem={e.item}
                         dbVAT={e.VAT}
                         dbMeasurment={e.measurment}
                         dbPrice={e.price}
                         dbQuantity={e.quantity}
                         dbIsEditing={false}
                    />))
          }
     }, [products])
     useEffect(() => {
          const data = { allTotal, allTotalVAT, allTotalWithoutVAT }
          getAllTotals(data)
     }, [allTotal, allTotalVAT, allTotalWithoutVAT])
     return (
          <div className="InvoiceTable">
               <Header />
               {rows}
               <Footer addRow={addRow} allTotal={allTotal} resetRows={resetRows} />

          </div>
     )
}