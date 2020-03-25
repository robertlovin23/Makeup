import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'

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
    render(){
        const { item } = this.props

        return(
            <Card>
                <CardActionArea>
                    <CardMedia style={{height:"150px"}}
                            image={item.image_link}
                             title={item.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                        </Typography>
                        {this.priceDif(item)}
                    </CardContent>

                </CardActionArea>               
            </Card>
        )
    }
}

export default ItemMakeup