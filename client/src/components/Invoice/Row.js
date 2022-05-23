import React, { useEffect, useState, useContext } from "react";
import "../../style/Header&Row.css"
import useInputControl from "../../hooks/useInputControl";
import { IconButton } from "@mui/material";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import useToggle from "../../hooks/useToggle"
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import Context from "../../context/Context";

export default function Row({ plusTotal, id, minusTotal, rowRemove, rowNum,
     dbItem = "",
     dbMeasurment = "",
     dbPrice = "",
     dbQuantity = "",
     dbVAT = "",
}) {

     const [item, setItem] = useInputControl(dbItem)
     const [measurment, setMeasurment] = useInputControl(dbMeasurment)
     const [price, setPrice] = useInputControl(dbPrice)
     const [quantity, setQuantity] = useInputControl(dbQuantity)
     const [VAT, setVAT] = useInputControl(dbVAT)
     const [isEditing, setEditing] = useToggle(true)
     const [priceWithoutVAT, setPriceWithoutVAT] = useState(0)
     const [totalVAT, setTotalVAT] = useState(0)
     const [total, setTotal] = useState(0)
     const { getRowData, removeRowData, isRowEditing, isRowDeleted } = useContext(Context)

     const calculate = () => {
          if (isEditing) {
               setPriceWithoutVAT((quantity * price))
               setTotalVAT((((price / 100) * VAT) * quantity))
               setTotal((((price / 100) * VAT) * quantity) + (quantity * price))
               setEditing()
               plusTotal((((price / 100) * VAT) * quantity) + (quantity * price), ((((price / 100) * VAT) * quantity)), (quantity * price))

               const data =
               {
                    id: id,
                    item: item,
                    measurment: measurment,
                    price: price,
                    quantity: quantity,
                    VAT: VAT,
               }

               getRowData(data, isEditing)

          } else if (!isEditing) {
               setEditing()
               setPriceWithoutVAT(0)
               setTotalVAT(0)
               setTotal(0)
               removeRowData(id)
               minusTotal(total, totalVAT, priceWithoutVAT)
          }
     }

     const handleRowRemove = (id) => {
          return () => {
               isRowDeleted(id)
               rowRemove(id)
               minusTotal(total, totalVAT, priceWithoutVAT)
          }
     }

     useEffect(() => {
          isRowEditing(isEditing, id)
     }, [isEditing])
     return (
          <div className="Row" key={id}>
               <div className="td rowNum">{rowNum}</div>
               <div className="td item">{isEditing ? <input type="text" value={item} onChange={setItem} /> : <span>{item}</span>}</div>
               <div className="td measurment">{isEditing ? <input type="text" value={measurment} onChange={setMeasurment} /> : <span>{measurment}</span>}</div>
               <div className="td price">{isEditing ? <input type="number" value={price} onChange={setPrice} /> : <span>{price}</span>}</div>
               <div className="td quantity">{isEditing ? <input type="number" value={quantity} onChange={setQuantity} /> : <span>{quantity}</span>}</div>
               <div className="td priceWithoutVAT"><span>{(priceWithoutVAT).toFixed(2)}</span></div>
               <div className="td VAT">{isEditing ? <input type="number" value={VAT} onChange={setVAT} /> : <span>{VAT}</span>}</div>
               <div className="td totalVAT"><span>{(totalVAT).toFixed(2)}</span></div>
               <div className="td total"><span>{(total).toFixed(2)}</span></div>
               <div className="td edit">

                    <IconButton onClick={calculate}>
                         {isEditing ?
                              <CheckSharpIcon />
                              :
                              <EditSharpIcon />
                         }
                    </IconButton>

               </div>
               <div className="td delete">
                    <IconButton onClick={handleRowRemove(id)}>
                         <DeleteSharpIcon />
                    </IconButton>
               </div>
          </div >
     )
}