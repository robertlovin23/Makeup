import React from 'react'
import { Link } from 'react-router-dom'
import ProductTemplate from '../pages/CategoryTemplate'
import { Card, CardActionArea, CardContent, CardMedia, Typography,Button } from '@material-ui/core'

class ItemMakeup extends React.Component{

    priceDif = () => {
        const { item } = this.props

        if(item.price === "0.0"){
            return(
                <Typography variant="body2" color="textSecondary" component="p">
                    FREE
                </Typography>
            )
        } else {
            return(
                <Typography variant="body2" color="textSecondary" component="p">
                    $ {item.price}
                </Typography>
            )
        }
    }

    showBrand = () => {
        const { item } = this.props

        if(!item.brand){
            return(
                <div>
                    N/A
                </div>
            )
        } else {
            return(
                <div>
                    {item.brand.charAt(0).toUpperCase() + item.brand.substr(1).toLowerCase()}
                </div>
            )
        }
    }
    render(){
        const { item,selectedItem } = this.props

        return(
        <Link to={`/products/${item.id}`} style={{textDecoration: "none"}} children={<ProductTemplate item={item} selectedItem={selectedItem}/>}>
            <Card>
                <CardActionArea>
                    <CardMedia style={{height:"150px"}}
                            image={item.image_link}
                             title={item.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" style={{textAlign:"left"}}>
                            {item.name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" style={{textAlign:"left"}}>
                        {this.showBrand(item)}
                        </Typography>
                        {this.priceDif(item)}
                        <div style={{width:"100%",paddingTop:"10px", paddingBottom:"10px"}}>
                            {
                                item.product_colors.map((color,i) => {
                                    return(
                                        <div class="color" style={{backgroundColor:`${color.hex_value}`, height: "20px", margin: "0 3px 3px 3px", borderRadius: "50%", width:"20px", display:"inline-block", alignContent:"left"}}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </CardContent>
                </CardActionArea>  
            </Card>
        </Link>             

        )
    }
}

export default ItemMakeup