import React from 'react'
import '../Makeup.css'
import { AppBar, Typography } from '@material-ui/core'

const Footer = () => {
    return(
        <AppBar position="static" style={{backgroundColor:"pink"}}>
            <div style={{marginRight:"15px",display:"inline-block"}}>
                <Typography className="footerText" variant="h6" color="inherit" style={{marginTop:"5px"}}>
                    <img src={"https://fontmeme.com/permalink/200403/fcd6f19ea287342917008a3500b6e25f.png"} style={{height:"50px", width:"100px"}}/>
                </Typography>
                <Typography className="footerText" style={{ float:"right",marginTop:"15px"}} variant="subtitle1" >
                    Copyright 2020
                </Typography>
            </div>
        </AppBar>
    )
}

export default Footer