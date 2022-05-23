import React from "react";
import "../../style/Footer.css"
import { IconButton } from "@mui/material";
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
export default function Footer({ allTotal, addRow, resetRows }) {
     return (
          <div className="Footer">
               <div className="reset">
                    <IconButton onClick={resetRows}>
                         <RefreshSharpIcon />
                    </IconButton>
               </div>
               <div className="empty"></div>
               <div className="allTotal">
                    <span>Вкупно: </span>
                    <span>{(allTotal).toFixed(2)}</span>
               </div>
               <div className="add">
                    <IconButton onClick={addRow}>
                         <AddCircleOutlineSharpIcon />
                    </IconButton>
               </div>
          </div >
     )
}

