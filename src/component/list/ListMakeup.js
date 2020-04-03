import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import '../Makeup.css'
import ItemMakeup from '../list/ItemMakeup'

class ListMakeup extends React.Component{

    render(){
        const { data,selectedProduct } = this.props
        const response = data.map((item,i) => {
            return(
                <Grid item xs={12} sm={3} key={i}>
                    <ItemMakeup item={item} selectedProduct={selectedProduct}/>
                </Grid>
            )
        })
        if(!data.length){
            return(
                <Grid container spacing={3} style={{padding:"150px 150px"}}>
                    <CircularProgress/>
                </Grid>

            )
        } else {
            return(
                <Grid container spacing={3} style={{paddingTop:"15px"}}>
                    {response}
                </Grid>

            )
        }
    }
}

export default ListMakeup