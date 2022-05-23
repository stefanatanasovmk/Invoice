import React from "react";
import { TextField, Button, Link, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Login({ email, password, login, register, setLoginPassword, setLoginEmail, setIsForgottenPassword }) {
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
                    <Typography variant="button" fontSize={"1rem"}>Логирај се</Typography>
                    <TextField style={inputStyle} label="Е-маил" variant="outlined"
                         value={email}
                         onChange={setLoginEmail} />
                    <TextField style={inputStyle} label="Лозинка" variant="outlined" type="password"
                         value={password}
                         onChange={setLoginPassword} />
                    <Button style={inputStyle} variant="contained"
                         onClick={login}>Логирај се</Button>
                    <Link className="Link" onClick={register} underline="none">
                         {'Регистрирај се'}
                    </Link>
                    <Link className="Link"
                         onClick={setIsForgottenPassword}
                         underline="none">
                         {'Заборавена лозинка'}
                    </Link>
               </div>
          </div >
     )
}