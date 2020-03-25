import React from 'react'
import makeup from '../../api/makeup'
import MainPhoto from '../../img/mainpage.jpg'
import ListMakeup from '../list/ListMakeup'
import Searchbar from '../Searchbar'
import '../Makeup.css'
import { Grid, GridList,GridListTile,GridListTileBar, Paper, FormControl, Container,Typography,Select,InputLabel,MenuItem, NativeSelect } from '@material-ui/core'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            highRated: []
        }
    }

    getHighestRates = async () => {
        const response = await makeup.get('/products.json',{
            params: {
                rating_greater_than: 4.98
            }
        })
        console.log(response)
        this.setState({
            highRated: response.data
        })
    }

    filterHighestRate = () => {
        if(!this.state.highRated.length){
            return(
                <div>Loading...</div>
            )
        }
    }

    componentDidMount = () => {
        this.getHighestRates()
    }
    render(){
        return(
            <Grid item justifycontent="center" style={{textAlign: "center"}}>   
                <img src={MainPhoto} style={{height:"650px", width:"100%"}}></img>
                    <Typography variant="h2" gutterBottom style={{paddingTop:"25px"}}>
                        Some of Our 5 Star Products
                    </Typography>
                    <Container style={{justifycontent:"center", paddingBottom:"25px"}}>
                        <GridList  spacing={15} cellHeight={250} style={{height:"500px",width:"100%"}} cols={4}>
                        {
                            this.state.highRated.map((rate) => {
                                return(
                                    <GridListTile style={{borderRadius:"25"}} key={rate.image_link}>
                                        <img src={rate.image_link} alt={rate.name} />
                                        <GridListTileBar
                                            title={rate.name}
                                            />
                                    </GridListTile>
                                 )
                            })
                        }
                        </GridList>
                    </Container>
                    <Grid item xs={12} style={{backgroundColor:"pink"}}>
                        <Typography variant="h2" gutterBottom style={{paddingTop:"20px"}}>
                            We support different types of products to accomodate your skin!
                        </Typography>
                    </Grid>
            </Grid>
        )
    }
}

export default Home