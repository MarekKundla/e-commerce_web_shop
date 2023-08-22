import React from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'

import './styles.css'

const Product = ({ product }) => {
    return (
        <Card className='root'>
            <CardMedia className='media' image='' title={product.name} />
            <CardContent>
                <div className='cardContent'>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {product.price}
                    </Typography>
                </div>
                <Typography variant='body2' color='textSecondary'>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='cardAction'>
                <IconButton aria-label='Add to cart'>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
