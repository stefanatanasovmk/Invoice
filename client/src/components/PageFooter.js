import { Typography, Link } from "@mui/material";
import React from "react";
import ".././style/PageFooter.css"
export default function PageFooter() {
     const style = { textDecoration: "none", color: "white", fontSize: "0.8em" }

     return (
          <div className="PageFooter">
               <div className="Content">
                    <Typography variant="button" style={style}>
                         Овозможено од
                         <Link
                              href="https://www.atanasov.fi" target="_blank"
                              varian="button"
                              style={{ textDecoration: "none", color: "white" }}> Атанасов</Link>
                    </Typography>
                    <Link
                         variant="button"
                         href="/usagepolicy"
                         // target="_blank"
                         varian="button"
                         style={style}>
                         Политика за користење
                    </Link>
               </div>
          </div >
     )
}