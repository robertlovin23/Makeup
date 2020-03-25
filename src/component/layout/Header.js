import React from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import { AppBar,Toolbar,Typography,Button,IconButton,SwipeableDrawer } from '@material-ui/core'

const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
}
const Header = () => {
    return(
        <AppBar position="static" style={{backgroundColor:"pink"}}>
            <Toolbar>
            {/* <React.Fragment key={anchor}> */}
                <IconButton edge=" start" 
                            color="inherit" 
                            aria-label="menu" 
                            // onClick={toggleDrawer(anchor, true)}
                >
                    <MenuIcon/>
                </IconButton>
                    <Typography variant="h6">
                        <Link to="/" style={{textDecoration:"none", color:'inherit'}}>
                            GirlyPop
                        </Link>
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header