import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import NavBar from "./components/NavBar";
import Context from "./context/Context";
import "./style/App.css"
import Verification from "./components/Verification/Verification"
import useToggle from "./hooks/useToggle";
function App() {
  //to know when to fetch updated data from the server
  const [isUserDataUpdated, setIsUserDataUpdated] = useToggle(false)
  //Flash state 
  const [flashIsOnTypeMsg, setFlash] = useState({ isOn: false, type: "", msg: "" })
  //Flash global function is used in Context in every component and it's displayed in NavBar & LoginSignup components
  const flashPopUp = (type, msg) => {
    setFlash({ isOn: true, type: type, msg: msg })
    setTimeout(() => {
      setFlash({ isOn: false, type: "", msg: "" })
    }, 5000)
  }
  //User state & control
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const fetchUserStatusAndData = () => {
    axios.get("/api/isauthenticated")
      .then((res) => {
        setIsAuthenticated(res.data.status)
        if (res.data.status) {
          setUser(res.data.user)
        }
      })
      .catch(e => flashPopUp("error", "Настана грешка, ве молиме обидете се повторно"))
  }
  useEffect(() => {
    fetchUserStatusAndData()
  }, [isUserDataUpdated], [])

  return (
    <div className="App">
      <Context.Provider value={{ isAuthenticated, user, flashPopUp, setIsUserDataUpdated }}>
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
