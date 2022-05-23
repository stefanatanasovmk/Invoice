import React from "react";
import { TextField, Button, Link, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Signup({ email, setEmail, password1, setPassword1, password2, setPassword2, register, login }) {
     const inputStyle = {
          margin: "5px",
          width: "100%",
          height: "30%"
     }
     const iconStyle = {
          height: "80px",
          width: "80px",
          borderRadius: "100%",
          boxShadow: "1px 1px 10px -3px black",
          margin: "10px"

     }
     return (
          <div className="Login">
               <div className="Icon">
                    <AccountCircleIcon style={iconStyle} />
               </div>
               <div className="Inputs">
                    <Typography variant="button" fontSize={"1rem"}>Регистрирај се</Typography>
                    <TextField style={inputStyle} label="Е-маил" type="email" variant="outlined"
                         value={email} onChange={setEmail} />
                    <TextField style={inputStyle} label="Лозинка" variant="outlined" type="password"
                         value={password1} onChange={setPassword1} />
                    <TextField style={inputStyle} label="Повтори лозинка" variant="outlined" type="password"
                         value={password2} onChange={setPassword2} />
                    <Button style={inputStyle} variant="contained" onClick={register}>Регистрирај се</Button>
                    <Link className="Link" onClick={login} underline="none">
                         {'Логирај се'}
                    </Link>
               </div>
          </div>
     )
}