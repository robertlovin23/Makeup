import React from 'react'
import { AppBar, Typography } from '@material-ui/core'

const Footer = () => {
    return(
        <AppBar position="static" style={{backgroundColor:"pink"}}>
            <Typography variant="h6" color="inherit">
                GirlyPop
            </Typography>
            <Typography varaint="subtitle1" style={{float:"right"}}>
                Copyright 2020
            </Typography>
        </AppBar>
    )
}

export default Footer