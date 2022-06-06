import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import NavBar from "./components/NavBar";
import Context from "./context/Context";
import "./style/App.css"
import Verification from "./components/Verification/Verification"
function App() {
  //to know when to fetch updated data from the server
  const [isUserDataUpdated, setIsUserDataUpdated] = useState({ status: "no" })
  const changeUserData = () => {
    setIsUserDataUpdated({ status: "yes" })
    setTimeout(() => {
      setIsUserDataUpdated({ status: "no" })

    }, 5000)
  }
  //Flash state 
  const [flashIsOnTypeMsg, setFlash] = useState({ isOn: false, type: "", msg: "" })
  //Flash global function is used in Context in every component and it's displayed in NavBar & LoginSignup components
  const flashPopUp = useCallback((type, msg) => {
    setFlash({ isOn: true, type: type, msg: msg })
    setTimeout(() => {
      setFlash({ isOn: false, type: "", msg: "" })
    }, 5000)
  }, [])
  //User state & control
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUserStatusAndData() {
      axios.get("/api/isauthenticated")
        .then((res) => {
          setIsAuthenticated(res.data.status)
          if (res.data.status) {
            setUser(res.data.user)
          }
        })
        .catch(e => flashPopUp("error", "Проблеми со серверот, ве молиме обидете се повторно."))
    }
    fetchUserStatusAndData()
  }, [isUserDataUpdated], [])

  return (
    <div className="App">
      <Context.Provider value={{ isAuthenticated, user, flashPopUp, changeUserData }}>
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
