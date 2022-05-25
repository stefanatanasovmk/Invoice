import React, { useContext } from "react";
import Context from "../context/Context";
import "../style/NavBar.css"
import { Avatar, Button, Typography } from '@mui/material';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import ReceiptSharpIcon from '@mui/icons-material/ReceiptSharp';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home/Home';
import Invoice from "./Invoice/Invoice"
import LoginSignup from './LoginSignup/LoginSignup';
import logout from "../functions/logout"
import Flash from './Flash/Flash';
import Verification from "./Verification/Verification"
import Settings from "./Settings/Settings"
import PageFooter from "./PageFooter"
import UsagePolicy from "./UsagePolicy/UsagePolicy";
import logo from "./logo.png"
export default function NavBar({ flash }) {
     const { isOn, type, msg } = flash
     const { user } = useContext(Context)
     const btnStyle = { width: "20%", height: "80%", }

     return (
          <>
               <Router>
                    <div className='NavBar'>

                         <div className='Logo'>
                              {/* <Typography component={NavLink} to="/" varian="button" style={{ textDecoration: "none", color: "black", fontSize: "1.5rem", fontFamili: "roboto" }} fontSize={"1.5rem"}>invoice</Typography> */}
                              <NavLink to="/"><img src={logo} height="50px" alt="logo" /></NavLink>
                         </div>
                         <div className='NavLink'>

                              <Button component={NavLink} to="/" variant="outlined" style={btnStyle} size="small" startIcon={<HomeSharpIcon />}>
                                   <Typography noWrap fontSize={"0.9em"} align="center">Мои фактури</Typography>
                              </Button>



                              <Button variant="outlined" style={btnStyle} size="small" component={NavLink} to="/invoice" startIcon={<ReceiptSharpIcon />}>
                                   <Typography noWrap fontSize={"0.9em"} align="center">Нова фактура</Typography>
                              </Button>

                              <Button variant="outlined" style={btnStyle} size="small" component={NavLink} to="/settings" startIcon={<AccountCircleSharpIcon />}>
                                   <Typography noWrap fontSize={"0.9em"} align="center">Поставки</Typography>
                              </Button>

                              <Button onClick={logout} variant="outlined" style={btnStyle} size="small" startIcon={<ExitToAppSharpIcon />}>
                                   <Typography noWrap fontSize={"0.9em"} align="center">Одјави се</Typography>
                              </Button>

                              <Avatar component={NavLink} to="/settings" alt="company logo" src={user.logo.path} />
                         </div >
                    </div >
                    <div className='Flash'>
                         {isOn &&
                              <Flash type={type} msg={msg} />
                         }
                    </div>

                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/invoice" element={<Invoice />} />
                         <Route path="/invoice/:id" element={<Invoice />} />
                         <Route path="/settings" element={<Settings />} />
                         <Route path="/loginsignup" element={<LoginSignup />} />
                         <Route path="/verify" element={<Verification />} />
                         <Route path="/usagepolicy" element={<UsagePolicy />} />
                         <Route path="*" element={<p>NOT FOUND</p>} />
                    </Routes>
                    <PageFooter />
               </Router >


          </>

     )

};

