import axios from "axios"
export default function logout() {
     axios.post("/api/logout")
     window.location.reload()
}