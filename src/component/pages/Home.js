import React from 'react'
import makeup from '../../api/makeup'
import MainPhoto from '../../img/mainpage.jpg'
import ListMakeup from '../list/ListMakeup'
import Searchbar from '../Searchbar'
import '../Makeup.css'
import Lipstick from '../../img/lipstick.jpg'
import { Grid, GridList,GridListTile,GridListTileBar, Button, Paper, FormControl, Container,Typography,Select,InputLabel,MenuItem, NativeSelect } from '@material-ui/core'

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
                <div style={{backgroundImage: `url(${MainPhoto})`}} class="splashImage">
                    <img src={"https://fontmeme.com/permalink/200403/fcd6f19ea287342917008a3500b6e25f.png"} class="logo"/> 
                    <Typography variant="h3" gutterBottom style={{color:"pink"}}>
                        Find Your Glam
                    </Typography>   
                </div>
                    <Typography variant="h4" gutterBottom style={{paddingTop:"50px"}}>
                        Some of Our 5 Star Products
                    </Typography>

                    <Container style={{justifycontent:"center", paddingBottom:"50px"}}>
                        <GridList  spacing={15} cellHeight={200} rows={2} style={{height:"400px",width:"100%"}} cols={3}>
                        {
                            this.state.highRated.map((rate) => {
                                console.log(rate.rating)
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
                    <Grid item xs={12} style={{backgroundColor:"pink", paddingTop:"50px", paddingBottom:"50px"}}>
                        <Typography variant="h4" gutterBottom>
                            We support different types of products to accomodate your skin!
                        </Typography>
                        <Grid item xs={8} style={{margin:"0 auto"}}>
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
                        <Grid item xs={12} sm={6}>
                            <img src={Lipstick} style={{width:"100%"}}></img>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" class="descTitle" style={{paddingTop:"50px"}}>
                                How we Roll
                                <Typography variant="body1">
                                    Lorem ipsum
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{backgroundColor:"pink"}}>
                        <Typography variant="h4" style={{padding:"50px"}}>
                            Contact Us!
                            <Grid style={{margin:"0 auto"}} item xs={8}>
                                <Typography variant="body1">
                                    Give us a shout! Or just give us suggestions on what we should improve. Feedback is appreciated!
                                </Typography>
                            </Grid>
                                <Button variant="contained" color="primary">
                                    Contact!
                                </Button>
                        </Typography>

                    </Grid>
            </Grid>
        )
    }
}

export default Home