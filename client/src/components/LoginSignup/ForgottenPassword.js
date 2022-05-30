import React from "react";
import { TextField, Button, Link, Typography, InputAdornment } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useToggle from "../../hooks/useToggle";
const inputStyle = {
     margin: "5px",
     width: "100%",
     height: "30%"
}
const cursorPointer = { cursor: "pointer" }
export default function ForgottenPassword({ setEmail, back, submit, isSubmited, setIsSubmited, setPassword1, setPassword2, password1, password2, email, setCode, code, changePassword }) {

     const [isPassword1Visible, setIsPassword1Visible] = useToggle(false)
     const [isPassword2Visible, setIsPassword2Visible] = useToggle(false)
     return (
          <div className="Form">
               <div className="Inputs">
                    <Typography variant="button" fontSize={"1rem"}>Заборавена лозинка</Typography>
                    {isSubmited ?
                         <>
                              <TextField disabled style={inputStyle} label="Вашиот емаил" type="text" value={email} variant="outlined"
                              />
                              <TextField style={inputStyle} label="Код" type="text" variant="outlined" onChange={setCode}
                                   value={code}
                                   helperText="Внесете го кодот што го добивте во емаил"
                              />
                              <TextField
                                   style={inputStyle}
                                   label="Внесете ја новата лозинка"
                                   type={isPassword1Visible ? "text" : "password"}
                                   variant="outlined"
                                   onChange={setPassword1}
                                   value={password1}
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
                                   label="Повторете ја новата лозинка"
                                   type={isPassword2Visible ? "text" : "password"}
                                   variant="outlined"
                                   onChange={setPassword2}
                                   value={password2}
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
                              <Button style={inputStyle} variant="contained" onClick={changePassword} >Потврди</Button>
                              <Link className="Link" underline="none" onClick={setIsSubmited}>
                                   {'Назад'}
                              </Link>
                         </>
                         :
                         <>
                              <TextField style={inputStyle} label="Внесете го вашиот емаил" type="text" variant="outlined" onChange={setEmail} value={email}
                              />
                              <Button style={inputStyle} variant="contained" onClick={submit} >Потврди</Button>
                              <Link className="Link" underline="none" onClick={back}>
                                   {'Назад'}
                              </Link>
                         </>
                    }
               </div>
          </div>
     )
}