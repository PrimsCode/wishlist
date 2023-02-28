import React, {useEffect, useState} from 'react';
import {Typography, Button, Grid, Box,  Paper, Stack} from '@mui/material';
import { useParams } from 'react-router-dom';
import WishlistApi from '../../helpers/WishlistAPI';
import Loading from '../Loading';
import WishlistCard from '../wishlist/WishlistCard';
import ItemCardHorizontal from './ItemCardHorizontal';
import {mainContainer, centerBox} from '../../style';


const Item = () => {
    const container = {display: "flex",width:"1200px", height:"250px", margin:"10px"};
    const wishlistContainer = {display: "flex", width:"1200px", minHeight:"300px", maxHeight:"350px", margin:"10px"};
    const {itemId} = useParams();
    const [item, setItem] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(false);
        getItem(itemId);
    }, []);

    const getItem = async(id) => {
        let item = await WishlistApi.getItem(id);
        setItem(item);
        getSimilarItems(item.category);
    }

    const getSimilarItems = async(category) => {
        let foundItems = await WishlistApi.getAllItemsCategory(category);

        let newItems = foundItems.items.filter((newItem) => {
            return newItem.id !== parseInt(itemId);
        })

        if (newItems.length > 3){
           const slicedArr = newItems.slice(0, 4);
           setItems(slicedArr);
        } else {
            setItems(newItems);
        }

        setIsLoading(true);
        return newItems;
    }

    if(!isLoading) return <Loading />

    return (
        <Grid container direction="column" sx={mainContainer}>
        <Grid container direction="column" sx={mainContainer}>

            <Box item sx={centerBox}>
                <Typography variant="h4">
                    {item.name}
                </Typography>
            </Box>

            <Box item sx={{margin:"10px"}}>
                <img src={item.image_link} alt={item.name} style={{height:'300px', overflow:'hidden'}}/>
            </Box>
            <Box item sx={{width:"500px"}}>
                    <Typography variant="body1">{item.description}</Typography>
            </Box>

            <Box item sx={{margin:"10px"}}>
                <div>
                    <Typography variant="h5">Price: ${item.price}</Typography>
                </div>
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{color: "inherit"}}>
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
            </Box>

        </Grid>

        <Grid containter>
            <Paper sx={container}> 
                <Grid>
                    <Typography variant="h5" sx={{margin:"10px"}}>Similar Items:</Typography>
                </Grid>

                <Stack direction="row">
                    {items.length ? 
                    <>
                        {items.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={2.5} >
                                <ItemCardHorizontal item={item} type="similar" />
                            </Grid>
                        ))}
                    </>
                    :
                    <Typography variant="h6" sx={{margin:"10px", alignItems:"center"}}>No Similar Item.</Typography>
                    }
                </Stack>
            </Paper>
        </Grid>

        <Grid containter>
            <Paper sx={wishlistContainer}>
            <Typography variant="h5" sx={{margin:"10px"}}>Wishlists:</Typography>
            {item.wishlists.length ? 
            <>
                {item.wishlists.map((wishlist) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.5} >
                        <WishlistCard wishlist={wishlist} />
                    </Grid>
                ))}
            </>
            :
            <Typography variant="h6" sx={{margin:"10px", alignItems:"center"}}>Not In Any Wishlist.</Typography>
            }
            </Paper>
        </Grid>


        </Grid>
    )
}

export default Item;