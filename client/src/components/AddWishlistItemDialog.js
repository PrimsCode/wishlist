import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography, Dialog, DialogTitle} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import SearchBar from './SearchBar';
import ItemList from './ItemList';


const AddWishlistItemDialog = (props) => {

    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const {open, onClose, handleAdd} = props;
    const [items, setItems] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [error, setError] = useState({
        state: false,
        message: ""
    });

    useEffect(()=> {
        searchItems();
    }, []);

    const searchItems = async(searchQuery) => {
        let items = await WishlistApi.getItems(searchQuery);
        setItems(items);
        setSearchData(items);
    }

    const handleError = (msg) => {
        setError({state:true, message: msg});
        setTimeout(() => {
            setError({state:false, message: ""});
        }, 5000);
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
            Add An Item To Wishlist          
            </DialogTitle>
            <SearchBar type={true} setSearchData={setSearchData} data={items} />
            <Grid container style={centering}>
                {searchData.length ? 
                    <ItemList items={searchData} type="horizontal" handleAdd={handleAdd} />
                :
                    <Typography variant="h5" sx={{margin:"30px"}} >No item found.</Typography>
                }
            </Grid>    
        </Dialog>
    )
}

export default AddWishlistItemDialog;

