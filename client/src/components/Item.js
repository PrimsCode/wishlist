import React, {useEffect, useState} from 'react';
import {Typography, Button, Grid, Paper} from '@mui/material';
import { useParams } from 'react-router-dom';
import WishlistApi from '../helpers/WishlistAPI';
import Loading from './Loading';


const Item = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const container = {display: "flex", height:"250px", margin:"10px"};
    const {itemId} = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(false);
        getItem(itemId);
    }, []);

    const getItem = async(id) => {
        let item = await WishlistApi.getItem(id);
        setItem(item);
        setIsLoading(true);
        console.log(item)
    }

    if(!isLoading) return <Loading />

    return (
        <>
        <Grid container direction="column" sx={centering} marginTop="50px" >

            <Grid item >
                <Typography variant="h4" sx={{ mb: 0.5 }} style={{align:"center"}}>
                    {item.name}
                </Typography>
            </Grid>

            <Grid item>
                <img src={item.image_link} alt={item.name} style={{height:'300px', overflow:'hidden'}}/>
            </Grid>
            <Grid item>
                    <Typography variant="body1">{item.description}</Typography>
            </Grid>

            <Grid item>
                <div>
                    <Typography variant="h5">Price: ${item.price}</Typography>
                </div>
                <a href={item.link} target="_blank" style={{color: "inherit"}}>
                    <Button 
                    variant="contained"
                    size="sm"
                    color="primary"
                    sx={{ ml: 'auto', fontWeight: 400}}
                    value={item.id}
                    >
                    Purchase here
                    </Button>
                </a>
            </Grid>

        </Grid>

        <Grid containter>
            <Paper sx={container}>
            <Typography variant="h5" sx={{margin:"10px"}}>Found In Wishlists:</Typography>
            </Paper>
        </Grid>

        <Grid containter>
            <Paper sx={container}> 
            <Typography variant="h5" sx={{margin:"10px"}}>Similar Items:</Typography>
            </Paper>
        </Grid>


        </>
    )
}

export default Item;