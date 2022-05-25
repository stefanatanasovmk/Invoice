import { Typography, Link } from "@mui/material";
import React from "react";
import ".././style/PageFooter.css"
import { NavLink } from "react-router-dom";
export default function PageFooter() {
     const style = { textDecoration: "none", color: "white", fontSize: "0.6em" }

     return (
          <div className="PageFooter">
               <div className="Content">
                    <Typography variant="button" style={style}>
                         Developed by
                         <Link
                              href="https://www.atanasov.fi" target="_blank"
                              varian="button"
                              style={{ textDecoration: "none", color: "white" }}> Atanasov.fi</Link>
                    </Typography>
                    <Typography
                         component={NavLink}
                         to="/usagepolicy"
                         varian="button"
                         style={style}>
                         Политика за користење
                    </Typography>
               </div>
          </div >
     )
}