import React from "react"
import randomColor from "../../randomColor/randomColor"

export default function InvoicesTableHeader() {
     const color = randomColor()
     return (
          <div className="InvoiceRow" style={{
               borderTopRightRadius: "5px",
               borderTopLeftRadius: "5px",
               backgroundColor: color
          }}>
               <div className="td seeInvoice"></div>
               <div className="td client">Клиент</div>
               <div className="td paymentDate">Рок за плаќање</div>
               <div className="td priceWithoutVAT">Цена без ДДВ</div>
               <div className="td VAT">ДДВ</div>
               <div className="td total">Вредност на фактурата</div>
               <div className="td payed"></div>
               <div className="td delete"></div>
          </div >
     )
}