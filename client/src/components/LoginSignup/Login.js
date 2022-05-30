import React from "react";
import { TextField, Button, Link, Typography, InputAdornment } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import useToggle from "../../hooks/useToggle";

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
          margin: "10px",
          backgroundColor: "white"

     }
     const [isPasswordVisible, setIsPasswordVisible] = useToggle(false)
     const cursorPointer = { cursor: "pointer" }

     return (
          <div className="Login">
               <div className="Icon">
                    <AccountCircleIcon style={iconStyle} />
               </div>
               <div className="Inputs">
                    <Typography variant="button" fontSize={"1rem"}>Логирај се</Typography>
                    <TextField
                         style={inputStyle}
                         label="Е-маил"
                         variant="outlined"
                         value={email}
                         onChange={setLoginEmail}
                         InputProps={{
                              startAdornment:
                                   <InputAdornment position="start">
                                        <EmailIcon />
                                   </InputAdornment>
                         }}
                    />
                    <TextField style={inputStyle}
                         label="Лозинка"
                         variant="outlined"
                         type={isPasswordVisible ? "text" : "password"}
                         value={password}
                         onChange={setLoginPassword}
                         InputProps={{
                              startAdornment:
                                   <InputAdornment position="start">
                                        {isPasswordVisible ?
                                             <VisibilityOffIcon
                                                  style={cursorPointer}
                                                  onClick={setIsPasswordVisible}
                                             />
                                             :
                                             <RemoveRedEyeIcon
                                                  style={cursorPointer}
                                                  onClick={setIsPasswordVisible}
                                             />
                                        }
                                   </InputAdornment>,
                         }}
                    />
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