import React from "react";
import { TextField, Button, Link, Typography, InputAdornment } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import useToggle from "../../hooks/useToggle";

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
const cursorPointer = { cursor: "pointer" }
export default function Signup({ email, setEmail, password1, setPassword1, password2, setPassword2, register, login }) {
     const [isPassword1Visible, setIsPassword1Visible] = useToggle(false)
     const [isPassword2Visible, setIsPassword2Visible] = useToggle(false)
     return (
          <div className="Login">
               <div className="Icon">
                    <AccountCircleIcon style={iconStyle} />
               </div>
               <div className="Inputs">
                    <Typography variant="button" fontSize={"1rem"}>Регистрирај се</Typography>
                    <TextField
                         style={inputStyle}
                         label="Е-маил"
                         type="email"
                         variant="outlined"
                         value={email}
                         onChange={setEmail}
                         InputProps={{
                              startAdornment:
                                   <InputAdornment position="start">
                                        <EmailIcon />
                                   </InputAdornment>

                         }}
                    />
                    <TextField
                         style={inputStyle}
                         label="Лозинка"
                         variant="outlined"
                         type={isPassword1Visible ? "text" : "password"}
                         value={password1}
                         onChange={setPassword1}
                         InputProps={{
                              startAdornment:
                                   <InputAdornment position="start">
                                        {isPassword1Visible ?
                                             <VisibilityOffIcon
                                                  style={cursorPointer}
                                                  onClick={setIsPassword1Visible}
                                             />
                                             :
                                             <RemoveRedEyeIcon
                                                  style={cursorPointer}
                                                  onClick={setIsPassword1Visible}
                                             />
                                        }
                                   </InputAdornment>

                         }}
                    />
                    <TextField
                         style={inputStyle}
                         label="Повтори лозинка"
                         variant="outlined"
                         type={isPassword2Visible ? "text" : "password"}
                         value={password2}
                         onChange={setPassword2}
                         InputProps={{
                              startAdornment:
                                   <InputAdornment position="start">
                                        {isPassword2Visible ?
                                             <VisibilityOffIcon
                                                  style={cursorPointer}
                                                  onClick={setIsPassword2Visible}
                                             />
                                             :
                                             <RemoveRedEyeIcon
                                                  style={cursorPointer}
                                                  onClick={setIsPassword2Visible}
                                             />
                                        }
                                   </InputAdornment>

                         }}
                    />

                    <Button style={inputStyle} variant="contained" onClick={register}>Регистрирај се</Button>
                    <Link className="Link" onClick={login} underline="none">
                         {'Логирај се'}
                    </Link>
               </div>
          </div>
     )
}