import React from "react"

export default function InvoicesTableHeader() {
     return (
          <div className="InvoiceRow HeaderRow">
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