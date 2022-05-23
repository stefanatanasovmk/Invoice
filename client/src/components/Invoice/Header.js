import React from "react";
import "../../style/Header&Row.css"
export default function Header() {
     return (
          <div className="Header">
               <div className="td rowNum">Ред. број</div>
               <div className="td item">Опис</div>
               <div className="td measurment">Единечна мерка</div>
               <div className="td price">Цена</div>
               <div className="td quantity">Количина</div>
               <div className="td priceWithoutVAT">Цена без ДДВ</div>
               <div className="td VAT">ДДВ</div>
               <div className="td totalVAT">Пресметан ДДВ</div>
               <div className="td total">Вкупно</div>
               <div className="td edit"></div>
               <div className="td delete"></div>
          </div>
     )
}