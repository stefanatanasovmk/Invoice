import React, { useContext, useEffect } from "react";
import { TextField, Button, Link, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useInputControl from "../../hooks/useInputControl";
import axios from "axios";
import Context from "../../context/Context";
import Flash from "../Flash/Flash";
import "../../style/Verification.css"

export default function Verification({ flash }) {
     const inputStyle = {
          margin: "10px",
          width: "100%",
          height: "30%",
     }
     const iconStyle = {
          height: "80px",
          width: "80px",
          borderRadius: "100%",
          boxShadow: "1px 1px 10px -3px black",
          margin: "10px",
          backgroundColor: "white"

     }

     const { flashPopUp, user } = useContext(Context)
     const { isOn, type, msg } = flash
     const [code, setCode] = useInputControl("")
     const verify = () => {
          const data = { code: code }
          axios.post("/api/verify", data)
               .then((res) => {
                    flashPopUp("success", res.data.msg)
                    window.location.reload()
               })
               .catch(e => flashPopUp("error", e.response.data.msg))
     }
     const sendCodeAgain = () => {
          axios.get("/api/sendcodeagain")
               .then((res) => {
                    flashPopUp("success", res.data.msg)
                    window.location.reload()
               })
               .catch(e =>
                    flashPopUp("error", e.response.data.msg))

     }
     const logout = () => {
          axios.post("/api/logout")
               .then((res) => {
                    window.location.reload()
               })
               .catch(e =>
                    flashPopUp("error", e.response.data.msg))
     }
     return (

          <div className="Verification">
               <div className="Flash">
                    {
                         isOn &&
                         <Flash type={type} msg={msg} />
                    }
               </div>
               <div className="Form">
                    <AccountCircleIcon style={iconStyle} />
                    <div className="Inputs" style={{ width: "30%" }}>
                         <Typography style={{ width: "100%" }} align="center" variant="subtitle1">Проверете го вашиот емаил „{user.username}“ каде ви испративме код за верификација, доколку мејлот не е во „inbox“, проверете во „spam“. Понекогаш потребно е повеќе време емаилот да биде испратен.</Typography>
                         <TextField style={inputStyle} label="Внесете го кодот за верификација" type="text" variant="outlined"
                              value={code} onChange={setCode} />
                         <Button style={inputStyle} variant="contained" onClick={verify} >Потврди</Button>
                         <Link className="Link" onClick={sendCodeAgain} underline="none">
                              {'Испрати го кодот повторно'}
                         </Link>
                         <Button style={inputStyle} variant="outlined" color="warning" onClick={logout} >Одлогирај се</Button>

                    </div>
               </div>
          </div>
     )
}