import { Alert } from "@mui/material";
export default function Flash({ type, msg }) {
     return (
          <div className="Flash" style={{ padding: "0" }}>
               <Alert sx={{ width: '80%' }} severity={type}>{msg}</Alert>
          </div>
     )
}

//Flash styling is done in Navbar.css & LoginSignup.css and the component is shown there.