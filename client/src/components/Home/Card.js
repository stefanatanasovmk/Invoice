import React from "react";
export default function Card({ cardFor, number }) {
     return (
          <div className="Card">
               <span
                    style={{
                         // fontSize: "1em",
                         textAlign: "center"
                    }}>{cardFor}</span>
               <span
                    style={{
                         paddingTop: "15px",
                         // fontSize: "1em"
                    }}>{number}</span>
          </div>
     )
}