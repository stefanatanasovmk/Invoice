import React, { useContext } from "react";
import "../../style/LoginSignup.css"
import Login from "./Login";
import Signup from "./Signup";
import useInputControl from "../../hooks/useInputControl";
import axios from "axios";
import useToggle from "../../hooks/useToggle";
import Context from "../../context/Context";
import Flash from "../Flash/Flash";
import isEmail from "../../functions/isEmail";
import ForgottenPassword from "./ForgottenPassword";
export default function LoginSignup({ flash }) {
     const { isOn, type, msg } = flash
     const { flashPopUp } = useContext(Context)
     const [isLoggingIn, setIsLoggingIn] = useToggle(true)
     const [isForgottenPassword, setIsForgottenPassword] = useToggle(false)
     const [email, setEmail] = useInputControl("")
     const [password1, setPassword1] = useInputControl("")
     const [password2, setPassword2] = useInputControl("")

     //Forgoten Password
     const [submited, setSubmited] = useToggle(false)

     const sendCodeForChangePassword = () => {
          const fixedEmail = email.trim().toLowerCase()
          axios.post("/api/changepassword", { email: fixedEmail })
               .then(res => flashPopUp("success", res.data.msg))
               .catch(e => flashPopUp("success", e.response.data.msg))
          setSubmited()
     }

     //Change password
     const [code, setCode] = useInputControl("")
     const changePassword = () => {
          const fixedEmail = email.trim().toLowerCase()
          const data = { password1: password1, password2: password2, email: fixedEmail, code: code }
          axios.post(`/api/changepassword/${code}`, data)
               .then(res => flashPopUp("success", res.data.msg))
               .catch(e => flashPopUp("error", e.response.data.msg))
          setSubmited()
          setIsForgottenPassword()
     }
     //Registration

     const register = () => {
          const fixedEmail = email.trim().toLowerCase()
          const data = { password1, password2, email: fixedEmail }
          if (isEmail(email)) {
               axios.post("/api/signup", data)
                    .then((res) => {
                         flashPopUp("success", res.data.msg)
                         setIsLoggingIn(true)
                    })
                    .catch((e) => {
                         if (e.response.data.code === 11000) {
                              flashPopUp("error", "Корисник со истиот емаил веќе постои, ве молиме логирајте се")
                         } else {
                              flashPopUp("error", e.response.data.msg)
                         }
                    })
          } else {
               flashPopUp("error", "Ве молиме внесете валидна емаил аддреса")
          }
     }

     //Login
     const login = () => {
          const fixedEmail = email.trim().toLowerCase()
          const data = { username: fixedEmail, password: password1 }
          axios.post("/api/login", data)
               .then((res) => {
                    flashPopUp("success", res.data.msg)
                    window.location.reload()
               })
               .catch(e => flashPopUp("error", "Погрешен емаил или лозинка"))
     }

     return (
          <div className="LoginSignup">
               <div className="Flash">
                    {isOn &&

                         <Flash type={type} msg={msg} />
                    }
               </div>
               {isForgottenPassword ?
                    <ForgottenPassword
                         email={email}
                         setEmail={setEmail}
                         back={setIsForgottenPassword}
                         submit={sendCodeForChangePassword} isSubmited={submited}
                         setIsSubmited={setSubmited}
                         changePassword={changePassword}
                         setPassword1={setPassword1}
                         setPassword2={setPassword2}
                         password1={password1}
                         password2={password2}
                         code={code}
                         setCode={setCode}

                    />
                    :
                    <>
                         {isLoggingIn ?
                              <React.Fragment>
                                   <Login
                                        email={email}
                                        password={password1}
                                        login={login}
                                        register={setIsLoggingIn}
                                        setLoginEmail={setEmail}
                                        setLoginPassword={setPassword1}
                                        setIsForgottenPassword={setIsForgottenPassword}
                                   />
                              </React.Fragment>
                              :
                              <React.Fragment>

                                   <Signup password1={password1} setPassword1={setPassword1} password2={password2} setPassword2={setPassword2} email={email}
                                        setEmail={setEmail} register={register}
                                        login={setIsLoggingIn} />
                              </React.Fragment>
                         }
                    </>
               }
          </div>
     )
}