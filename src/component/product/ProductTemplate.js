import React from 'react'
import makeup from '../../api/makeup'
import { Grid, Paper, FormControl, Button, Container,Typography,Select,InputLabel,MenuItem, NativeSelect } from '@material-ui/core'


class ProductTemplate extends React.Component {
    state = {
        product: null
    }

    handleRequest = async () => {
        const props = this.props
        const response = await makeup.get('/products.json')

        for(var i = 0; i < response.data.length; i++){
            console.log(response.data[i].id === Number(props.match.params.id))
            if(response.data[i].id === Number(props.match.params.id)){
                this.setState({
                    product: response.data[i]
                })
                console.log(this.state.product)
            }
        }
    }
    componentDidMount = () => {
        this.handleRequest();
    }
    render(){
        const product  = this.state.product
        console.log(product,this.props)

        if(!product){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div>
                    <Typography variant="h2" style={{textAlign: "center",paddingTop:"10px"}}>
                        {product.name}
                    </Typography>
                    <Container spacing={3}>
                        <Grid item xs={3}>
                            <img src={product.image_link} alt={product.name} style={{width:"100%", height:"250px"}}></img>
                                <Typography variant="subtitle2">Brand: {product.brand}</Typography>
                            <br/>
                                <Typography variant="subtitle2">Price: ${product.price}</Typography>
                            <br/>
                                <Typography variant="subtitle2">Rating: {product.rating}</Typography>
                            <div style={{paddingTop:"15px"}}>
                                <Button variant="contained" color="primary" href={product.product_link}>
                                    Buy Now
                                </Button> 
                            </div>
                        </Grid>
                    </Container>
                    <Container spacing={3}>
                        <Grid item xs={12} style={{paddingTop:"15px"}}>
                            {product.product_colors.map((color,i) => {
                                return(
                                    <div style={{display:"inline-block", margin:"0px 2px"}}>
                                        <div key={i} style={{display: 'flex', flexWrap:"flex",alignItems:"center"}}>
                                            <div className="color" style={{backgroundColor:`${color.hex_value}`, height: "20px", margin: "0 3px 3px 3px", borderRadius: "50%", width:"20px"}}>
                                            </div>
                                            <Typography variant = "subtitle1" style={{display:"inline-block",float:"right", margin: "0 3px 3px 3px"}}>{color.colour_name}</Typography>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </Grid>
                    </Container>
                    <Container spacing={3}>
                        <Grid item xs={12} style={{paddingTop:"15px"}}>
                            <Typography variant="body1">{product.description.replace(/<(.|\n)*?>/g, '')}</Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop:"15px"}}>
                            {product.tag_list.map((prod,i) => {
                                console.log(prod)
                                return(
                                   <Typography key={i} variant="body1">{prod}</Typography>
                                )
                            })}

                        </Grid>
                    </Container>
                </div>
            )
        }
    }
}

export default ProductTemplate;