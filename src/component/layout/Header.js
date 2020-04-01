import React from 'react'
import { Link } from 'react-router-dom'
import   MenuIcon  from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CategoryTemplate from '../pages/CategoryTemplate'
import makeup from '../../api/makeup'
import { AppBar,Toolbar,Typography, List, Button,IconButton,Drawer } from '@material-ui/core'


class Header extends React.Component {
    constructor(){
        super()
        this.state={
            openMenu: false
        }
    }

    openSideMenu = () => {
        this.setState({
            openMenu: true
        })
    }  

    closeSideMenu = () => {
        this.setState({
            openMenu: false
        })
    }

    render(){
    const { links } = this.props
    console.log(links)
    
    return(
        <div>
            <AppBar position="static" style={{backgroundColor:"pink"}}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.openSideMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            <Link to="/">GirlyPop</Link>
                        </Typography>
                    </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={this.state.openMenu}
                style={{width:"300px"}}
            >
                <div>
                    <IconButton onClick={this.closeSideMenu} style={{marginLeft:"-12",marginRight:"20"}}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <div style={{marginLeft:"70px",marginRight:"50px"}}>
                    {
                        links.map((link,i) => {

                            return(
                            <Typography variant="h6">
                                <Link key={i} to={`/${link.name}`} children={<CategoryTemplate/>}>
                                    {link.linkName}
                                </Link>
                            </Typography>
                            )
                        })
                    }
                </div>
            </Drawer>
        </div>
        )
    }
}

export default Header