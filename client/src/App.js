import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import NavBar from "./components/NavBar";
import Loader from "./Loader";
import Context from "./context/Context";
import "./style/App.css"
import Verification from "./components/Verification/Verification"
import PageFooter from "./components/PageFooter";
function App() {
  //Flash state 
  const [flashIsOnTypeMsg, setFlash] = useState({ isOn: false, type: "", msg: "" })
  //User state & control
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const status = () => {
    axios.get("/api/isauthenticated")
      .then((res) => {
        setIsAuthenticated(res.data.status)
        if (res.data.status) {
          setUser(res.data.user)
        }
      })
      .catch(e => setFlash({ isOn: true, type: "error", msg: e.response.data.msg }))

  }
  useEffect(() => {
    status()
  }, [flashIsOnTypeMsg], [])

  //Flash global function is used in Context in every component and it's displayed in NavBar & LoginSignup components
  const flashPopUp = (type, msg) => {
    setFlash({ isOn: true, type: type, msg: msg })
    setTimeout(() => {
      setFlash({ isOn: false, type: "", msg: "" })
    }, 5000)

  }
  return (
    <div className="App">
      <Context.Provider value={{ isAuthenticated, user, flashPopUp }}>

        {
          isAuthenticated ?
            user.verified ?
              <NavBar isVerified={user.verified} isAuthenticated={isAuthenticated} flash={flashIsOnTypeMsg} />
              :
              <Verification flash={flashIsOnTypeMsg} />
            :
            <LoginSignup flash={flashIsOnTypeMsg} />
        }
      </Context.Provider>
    </div>
  );
}

export default App;
