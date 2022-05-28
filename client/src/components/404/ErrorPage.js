import React from "react";
import "./ErrorPage.css"
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function ErrorPage() {
     return (
          <div className="ErrorPage">
               <div className="ErrorDiv">
                    <Typography variant="h1">404</Typography>
                    <Typography variant="button">Овде нема што да се види...</Typography>
                    <Button component={NavLink} to="/" variant="contained">Ела си на почетна</Button>
               </div>
          </div>
     )
}