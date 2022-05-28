import React, { useState, useContext } from "react";
import Context from "../../context/Context";
import "../../style/Settings.css"
import { ButtonGroup, Button } from "@mui/material";
import CompanyInfo from "./CompanyInfo"
import axios from "axios";
import UserSettings from "./UserSettings";
import { useNavigate } from "react-router-dom";
export default function Settings() {
     const navigate = useNavigate()
     const [isItInfo, setIsItInfo] = useState(true)
     const { flashPopUp, user, setIsUserDataUpdated } = useContext(Context)
     const inputsStyle = {
          margin: "5px"
     }

     const companyInfoSubmit = (data, img) => {
          const config = {
               headers: {
                    'content-type': 'multipart/form-data'
               }
          }
          axios.post(`/api/addimage/${user._id}`, { image: img }, config)
          axios.post(`/api/companyinfo/${user._id}`, { data: data })
               .then(res => {
                    flashPopUp("success", res.data.msg)
               })
               .catch(e => {
                    flashPopUp("error", e.reponse.data.msg)
               })
          setIsUserDataUpdated()
     }
     const changePassword = (oldPass, newPass) => {
          const data = { oldPass, newPass }
          axios.post(`/api/changepass/${user._id}`, data)
               .then(res => flashPopUp("success", res.data.msg))
               .catch(e => flashPopUp("error", e.response.data.msg))
     }
     const changeEmail = (newEmail) => {
          const data = { email: newEmail }
          axios.post(`/api/changeemail/${user._id}`, data)
               .then(res => flashPopUp("success", res.data.msg))
               .catch(e => flashPopUp("error", e.response.data.msg))
     }

     const deleteUser = () => {
          axios.post(`/api/deleteuser/${user._id}`)
               .then((res) => {
                    flashPopUp("success", res.data.msg)
                    navigate(0)
               })
               .catch(e => flashPopUp("error", e.response.data.msg))
     }

     function changePassAndEmail(e) {
          setIsItInfo(false)
     }
     function changeCompanyInfo() {
          setIsItInfo(true)
     }

     return (
          <div className="Settings">
               <ButtonGroup variant="contained"
                    style={{ width: "80%" }} fullWidth
                    aria-label="outlined primary button group">
                    <Button style={{ backgroundColor: isItInfo ? "#FFC101" : "#1976D2" }} onClick={changeCompanyInfo}>Податоци за компанијата</Button>
                    <Button style={{ backgroundColor: !isItInfo ? "#FFC101" : "#1976D2" }} onClick={changePassAndEmail}>Промени лозинка и емаил</Button>
               </ButtonGroup>
               {
                    isItInfo ?
                         <CompanyInfo
                              inputsStyle={inputsStyle}
                              user={user}
                              submit={companyInfoSubmit}
                              flashPopUp={flashPopUp}
                         />
                         :
                         <UserSettings
                              inputsStyle={inputsStyle}
                              user={user}
                              flashPopUp={flashPopUp}
                              changePassword={changePassword}
                              changeEmail={changeEmail}
                              deleteUser={deleteUser}
                         />
               }
          </div >
     )
}