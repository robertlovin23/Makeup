import React from 'react'
import makeup from '../../api/makeup'
import MainPhoto from '../../img/mainpage.jpg'
import ListMakeup from '../list/ListMakeup'
import Searchbar from '../Searchbar'
import '../Makeup.css'
import Lipstick from '../../img/lipstick.jpg'
import { Grid, GridList,GridListTile,GridListTileBar, Paper, FormControl, Container,Typography,Select,InputLabel,MenuItem, NativeSelect } from '@material-ui/core'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            highRated: [],
            selectItem: null
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

    // selectItem = (item) => {
    //     this.setState({
    //         selectItem: item
    //     })
    // }

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
                        <Grid item xs={8} style={{margin:"0 auto",paddingBottom:"25px"}}>
                            <Typography variant="body1" gutterBottom style={{textAlign:"left"}}>
                                We want to recommend you the best products and allow you to compare
                                products to each other so that you know what is best for your skin. We 
                                recommend inclusive products that all women can wear. Be your best self!
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{textAlign:"left"}}>
                                We think it's important to be able to make a difference in your skin routine and
                                we want you to find unbiased, real reviews of different products. We hop we can
                                make a positive difference in your shopping experience.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing="3">
                        <Grid item xs={6}>
                            <img src={Lipstick} style={{width:"100%"}}></img>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h3" style={{paddingTop:"50px"}}>
                                How we Roll
                                <Typography variant="body1">
                                    Lorem ipsum
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{backgroundColor:"pink"}}>
                        <Typography variant="h3" style={{padding:"50px"}}>
                            Contact Us!
                            <Typography variant="body1">
                                Give us a shout! Or just give us suggestions on what we should improve. Feedback is appreciated!
                            </Typography>
                        </Typography>

                    </Grid>
            </Grid>
        )
    }
}

export default Home