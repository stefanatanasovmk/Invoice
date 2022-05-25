import React from "react";
import { Typography, Link } from "@mui/material";

export default function UsagePolicy() {
     const style = { width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }
     const textStyle = { paddingTop: "5px", paddingBottom: "5px" }
     return (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
               <div style={style}>
                    <Typography variant="h5">
                         Политика за користење на апликацијата
                    </Typography>
                    <Typography variant="subtitle1" style={textStyle}>
                         <p>1. Invoice е отворен проект, и кодот за истиот можете да го најдете овде: <Link target=" _blank" href="https://github.com/stefanatanasovmk/Invoice">линк</Link>.</p>
                    </Typography>
                    <Typography variant="subtitle1" style={textStyle}>
                         <p>2. Invoice е личен проект работен во слободно време со цел подобро да се разберат технологиите како React, ExpressJS, MongoDB, MUI и слични.</p>
                    </Typography>
                    <Typography variant="subtitle1" style={textStyle}>
                         <p>3. Invoice не гарантира за безбедноста на вашите лични податоци и тие на вашата компанија. Ова е бесплатен сервис, изработен волонтерски и не гарантира дека податоците што ги внесувате во софтверот се 100% безбедни.</p>
                    </Typography>
                    <Typography variant="subtitle1" style={textStyle}>
                         <p>4. Со користење на овој софтвер, се согласувате дека сте ја прочитале и разбрале „Политиката за користење“ и се согласувате со истата.</p>
                    </Typography>
                    <Typography variant="subtitle1" style={textStyle}>
                         <p>- Доколку имате прашања или идеи за подобрување на софтерот ве молам контактирајте ме на мојот емаил atanasovstefan@hotmail.com</p>
                    </Typography>
               </div>
          </div >
     )
}