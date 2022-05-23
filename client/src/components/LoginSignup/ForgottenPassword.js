import React from "react";
import { TextField, Button, Link, Typography } from "@mui/material";

export default function ForgottenPassword({ setEmail, back, submit, isSubmited, setIsSubmited, setPassword1, setPassword2, password1, password2, email, setCode, code, changePassword }) {
     const inputStyle = {
          margin: "5px",
          width: "100%",
          height: "30%"
     }

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
                              <TextField style={inputStyle} label="Внесете ја новата лозинка" type="password" variant="outlined" onChange={setPassword1}
                                   value={password1}
                              />
                              <TextField style={inputStyle} label="Повторете ја новата лозинка" type="password" variant="outlined" onChange={setPassword2}
                                   value={password2}

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