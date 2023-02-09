import React, {useEffect, useState} from 'react';
import {Grid, Typography, Button} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import Loading from './Loading';
import SearchBar from './SearchBar';
import NewItemDialog from './NewItemDialog';
import ItemScrapeDialog from './ItemScrapeDialog';
import ItemList from './ItemList';

const ItemPage = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const [items, setItems] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(false);
        searchItems();
    }, []);

    const searchItems = async(searchQuery) => {
        let items = await WishlistApi.getItems(searchQuery);
        setItems(items);
        setSearchData(items);
        setIsLoading(true);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //new to change to update useEffect for wishlist
    const createNewItem = async (data) => {
        const newItem = await WishlistApi.createNewItem(data);
        setItems(oldItem => [...oldItem, newItem]);
        console.log(newItem);
        console.log(items);
    }

    if(!isLoading) return <Loading />

    return (
        <>
        <Grid item xs={12} style={centering} margin='20px'>
            <Typography variant='h2'>Items</Typography>
        </Grid>

        <Grid container style={centering}>

            <SearchBar type={true} setSearchData={setSearchData} data={items} />

            <Grid item xs={12} style={centering}>
                <Button variant="contained" color="primary" style={{margin:'10px'}} onClick={handleOpen}>
                    Add New Item
                </Button>
                {/* <ItemScrapeDialog createNewItem={createNewItem} open={open} onClose={handleClose}/> */}
                <NewItemDialog createNewItem={createNewItem} open={open} onClose={handleClose}/>
            </Grid>

        </Grid>

        <Grid container style={centering}>
            {searchData.length ? 
                <ItemList items={searchData} type="vertical" />
            :
                <Typography variant="h5" sx={{margin:"30px"}} >No item found.</Typography>
            }
        </Grid>

        </>
    )
}

export default ItemPage;