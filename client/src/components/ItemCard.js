import React, {useContext, useState} from 'react';
import {Grid, Typography, Button, Card, CardHeader, CardMedia, CardContent, Box} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import UserContext from '../helpers/UserContext';


const ItemCard = ({item}) => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const mainGrid = {border:"solid", minWidth:"100%", height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"};
    const tag = {borderRadius: "8px", maxHeight: '25px', minHeight: '25px', fontSize:'10px'};

    return (

        <Card variant='outlined' sx={{ width: 280, margin: '15px' }} style={centering}>
            <CardContent>
                <Box style={{align:"center"}}>
                <Typography variant="h6" fontSize="md" sx={{ mb: 0.5 }} style={{align:"center"}}>{item.name}</Typography>
                </Box>
                <Box>
                <Button variant="contained" color="customGrey" style={tag}>
                {item.category}
                </Button>
                </Box>
                <Box style={centering} sx={{margin: 2}}>
                <img src={item.imageLink} alt={item.name} style={{height:'150px', overflow:'hidden'}}></img>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <div>
                    <Typography variant="body2">Price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">${item.price}</Typography>
                    </div>
                    <Button
                    variant="contained"
                    size="sm"
                    color="primary"
                    sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth:50 }}
                    >
                    Add
                    </Button>
                </Box>
            </CardContent>
        </Card>

    )
}

export default ItemCard;