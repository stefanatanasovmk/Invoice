import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
export default function CompanyInfo({ inputsStyle, user, submit, flashPopUp }) {
     const [companyName, setCompanyName] = useState("")
     const [address, setAddress] = useState("")
     const [tel, setTel] = useState("")
     const [bankAccount, setBankAccount] = useState("")
     const [taxNumber, setTaxNumber] = useState("")
     const [image, setImage] = useState()
     const handleSubmit = () => {
          const data = { companyName, address, tel, bankAccount, taxNumber }
          submit(data, image)
     }
     const handleImageUpload = (e) => {
          if (e.target.files[0]) {
               if (e.target.files[0].size > 5000000) {
                    flashPopUp("error", "Сликата не може да биде поголема од 5mb")
               } else if (!(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg")) {
                    flashPopUp("error", "Недозволен формат, дозволени се само .jpeg, .jpg и .png формат")
               } else {

                    setImage(e.target.files[0])

               }
          }
     }
     useEffect(() => {

          setCompanyName(user.companyName)
          setAddress(user.address)
          setTel(user.tel)
          setBankAccount(user.bankAccount)
          setTaxNumber(user.taxNumber)

     }, [user])

     return (
          <div className="InputRows">
               <div className="InputGroups">
                    <TextField variant="outlined" label="Име на вашата компанија" value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" fullWidth style={inputsStyle} />
                    <TextField variant="outlined" label="Адреса" value={address} onChange={(e) => setAddress(e.target.value)} type="text" fullWidth style={inputsStyle} />
                    <TextField variant="outlined" label="Телефонски број" value={tel} onChange={(e) => setTel(e.target.value)} type="text" fullWidth style={inputsStyle} />


               </div>
               <div className="InputGroups">
                    <TextField variant="outlined" label="Жиро сметка" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} type="text" fullWidth style={inputsStyle} />
                    <TextField variant="outlined" label="Даночен број" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} type="text" fullWidth style={inputsStyle} />
                    <TextField variant="outlined" type="file" fullWidth onChange={handleImageUpload}
                         helperText="Логото на вашата компанија" style={inputsStyle} encType="multipart/form-data" />
                    <Button variant="contained" onClick={handleSubmit} fullWidth>Зачувај</Button>

               </div>
          </div>
     )
}