import React from "react"
import randomColor from "../../randomColor/randomColor"

export default function InvoicesTableHeader() {
     // background - color: #8BC6EC;
     // background - image: ;

     return (
          <div className="InvoiceRow" style={{
               borderTopRightRadius: "5px",
               borderTopLeftRadius: "5px",
               backgroundColor: "#8BC6EC",
               backgroundImage: "linear-gradient(135deg, #8BC6EC 0 %, #9599E2 100 %)"
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