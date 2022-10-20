import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography, Button, Card, CardHeader, CardMedia, CardContent} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import UserContext from '../helpers/UserContext';
import Loading from './Loading';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';

const ItemList = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const mainGrid = {border:"solid", minWidth:"100%", height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"};
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(false);
        searchItems();
    }, []);

    const searchItems = async(searchQuery) => {
        let items = await WishlistApi.getItems(searchQuery);
        setItems(items);
        setIsLoading(true);
    }

    if(!isLoading) return <Loading />

    return (
        <Grid container style={centering}>
            <SearchBar type="items" search={searchItems} />
            {items.length ?
                <div>
                    {items.map((item) => (
                        <ItemCard item={item} />
                    ))}
                </div>
            :
            <Typography variant="h5" >No Item Found!</Typography>}

        </Grid>
    )
}

export default ItemList;