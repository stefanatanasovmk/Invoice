import React from "react";
import randomColor from "../../randomColor/randomColor"
export default function Card({ cardFor, number }) {

     const color = randomColor()
     return (
          <div className="Card" style={{ backgroundColor: color }}>
               <span
                    style={{
                         fontSize: "1.5em",
                         paddingBottom: "10%"
                    }}>{cardFor}</span>
               <span
                    style={{
                         fontSize: "1.5em"
                    }}>{number}</span>
          </div>
     )
}