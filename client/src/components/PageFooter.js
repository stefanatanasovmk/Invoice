import { Typography, Link } from "@mui/material";
import React from "react";
import ".././style/PageFooter.css"
import { NavLink } from "react-router-dom";
import AtanasovLogo from "../images/AtanasovLogoWhite.png"
export default function PageFooter() {
     const style = { textDecoration: "none", color: "white", fontSize: "0.6em" }

     return (
          <div className="PageFooter">
               <div className="Content">
                    <div className="DevelopedByDiv">
                         <Typography variant="button" style={style}>
                              Developed by
                         </Typography>
                         <Link
                              href="https://www.atanasov.fi" target="_blank"
                              varian="button"
                              style={{ textDecoration: "none", color: "white" }}>
                              <img src={AtanasovLogo} className="AtanasovFooterLogo" alt="Atanasov Logo" />
                         </Link>
                    </div>
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