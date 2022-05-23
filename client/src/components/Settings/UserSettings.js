import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment, Modal, Typography, Box } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useToggle from "../../hooks/useToggle";
import useInputControl from "../../hooks/useInputControl";

const modalStyle = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: "80%",
     bgcolor: 'background.paper',
     border: '2px solid black',
     backgroundColor: "white",
     boxShadow: 24,
     p: 4,
};
const modalBtnsStyle = {
     display: "flex", flexDirection: "row", justifyContent: "space-around", paddingBottom: "5px"
}

export default function UserSettings({ inputsStyle, user, flashPopUp, changePassword, changeEmail, deleteUser }) {

     const [openModal, setOpenModal] = useToggle(false);



     const [isOldPasswordVisible, setIsOldPasswordVisible] = useToggle(false)
     const [isPassword1Visible, setIsPassword1Visible] = useToggle(false)
     const [isPassword2Visible, setIsPassword2Visible] = useToggle(false)
     const [oldPassword, setOldPassword] = useInputControl("")
     const [password1, setPassword1] = useInputControl("")
     const [password2, setPassword2] = useInputControl("")
     const [email, setEmail] = useState("")
     const cursorPointer = { cursor: "pointer" }

     const handlePassChange = () => {
          if (password1 === password2) {
               changePassword(oldPassword, password1)
          } else {
               flashPopUp("error", "Лозинките не се совпаѓаат,обидете се повторно")
          }
     }
     const handleEmailChange = () => {
          changeEmail(email)
     }
     useEffect(() => {
          setEmail(user.username)
     }, [user])
     return (

          <div className="InputRows">
               <div className="InputGroups">               <TextField
                    variant="outlined"
                    label="Стара лозинка"
                    type={isOldPasswordVisible ? "text" : "password"}
                    fullWidth
                    style={inputsStyle}
                    value={oldPassword}
                    onChange={setOldPassword}
                    InputProps={{
                         startAdornment: <InputAdornment position="start">
                              {isOldPasswordVisible ?
                                   <VisibilityOffIcon
                                        style={cursorPointer}
                                        onClick={setIsOldPasswordVisible}
                                   />
                                   :
                                   <RemoveRedEyeIcon
                                        style={cursorPointer}
                                        onClick={setIsOldPasswordVisible}
                                   />
                              }
                         </InputAdornment>,
                    }}
               />
                    <TextField
                         variant="outlined"
                         label="Нова лозинка"
                         type={isPassword1Visible ? "text" : "password"}
                         fullWidth
                         style={inputsStyle}
                         value={password1}
                         onChange={setPassword1}
                         InputProps={{
                              startAdornment: <InputAdornment position="start">
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
                              </InputAdornment>,
                         }}
                    />
                    <TextField
                         variant="outlined"
                         label="Повтори нова лозинка"
                         type={isPassword2Visible ? "text" : "password"}
                         fullWidth
                         style={inputsStyle}
                         value={password2}
                         onChange={setPassword2}
                         InputProps={{
                              startAdornment: <InputAdornment position="start">
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
                              </InputAdornment>,
                         }}
                    />
                    <Button variant="contained" fullWidth onClick={handlePassChange}>Промени лозинка</Button>
               </div>
               <div className="InputGroups EmailAndUserDelete" >
                    <div className="ChangeEmailDiv">
                         <TextField
                              variant="outlined"
                              label="Емаил"
                              type="text"
                              fullWidth
                              style={inputsStyle}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                         />
                         <Button variant="contained" fullWidth onClick={handleEmailChange}>Промени емаил</Button>
                    </div>

                    <Button variant="contained" fullWidth onClick={setOpenModal}>
                         Избриши го профилот
                    </Button>
                    <Modal open={openModal}>
                         <Box style={modalStyle}>
                              <Typography
                                   variant="button">
                                   Со бришење на вашиот профил, сите ваши фактури и клиенти ќе бидат избришани од системот, дали сте сигурни дека сакате да продолжете?
                              </Typography>
                              <div style={modalBtnsStyle}>                              <Button
                                   variant="outlined"
                                   onClick={deleteUser}>
                                   ДА
                              </Button>
                                   <Button
                                        variant="contained" onClick={setOpenModal}>
                                        НЕ
                                   </Button>
                              </div>

                         </Box>
                    </Modal>
               </div>
          </div>
     )
}