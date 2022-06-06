import React from "react";
import useInputControl from "../../hooks/useInputControl";
import "../../style/CompanyInfo.css"
export default function CompanyInfo({ companyInfo }) {
     const { name, address, telephone, mail, bankAcc, tax, logo } = companyInfo
     const [companyName, setCompanyName] = useInputControl(name)
     const [companyAddress, setCompanycompanyAddress] = useInputControl(address)
     const [tel, setTel] = useInputControl(telephone)
     const [email, setEmail] = useInputControl(mail)
     const [IBAN, setIBAN] = useInputControl(bankAcc)
     const [taxNumber, setTaxNumber] = useInputControl(tax)
     return (
          <div className="CompanyInfo">
               <div className="InputGroup">
                    <input type="text" value={companyName} onChange={setCompanyName} placeholder="Име на компанијата" />
                    <input type="text" value={companyAddress} onChange={setCompanycompanyAddress} placeholder="Адреса на компанијата" />
                    <input type="text" value={tel} onChange={setTel} placeholder="Телефонски број" />
               </div>
               <div className="InputGroup">
                    <input type="text" value={email} onChange={setEmail} placeholder="Е-маил" />
                    <input type="text" value={IBAN} onChange={setIBAN} placeholder="Жиро сметка" />
                    <input type="text" value={taxNumber} onChange={setTaxNumber} placeholder="Даночен број" />
               </div>
               <div className="LogoDiv">
                    {logo && <img src={logo} alt="CompanyLogo" className="Logo" />}
               </div>
          </div>
     )
}