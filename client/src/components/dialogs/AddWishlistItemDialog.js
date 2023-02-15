import React, { useEffect, useState } from 'react';
import { Grid, Typography, Dialog, DialogTitle } from '@mui/material';
import WishlistApi from '../../helpers/WishlistAPI';
import SearchBar from '../search/SearchBar';
import ItemList from '../item/ItemList';


const AddWishlistItemDialog = (props) => {

    const centering = { display: "flex", justifyContent: "center", alignItems: "center" };
    const { open, onClose, handleAdd, currItems } = props;
    const [items, setItems] = useState([]);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        searchItems();
    }, []);

    const searchItems = async (searchQuery) => {
        let items = await WishlistApi.getItems(searchQuery);
        getCurrItemsIds(items);
    }

    const getCurrItemsIds = (items) => {
        const idArr = []
        for (let i = 0; i < currItems.length; i++) {
            idArr.push(currItems[i].id);
        }
        let itemArr = (items.filter((item) => { return !idArr.includes(item.id) }));
        setItems(itemArr);
        setSearchData(itemArr);
    }

    const itemRemove = (itemId) => {
        console.log(itemId);
        const newArr = (items.filter((item) => {
            return item.id !== itemId
        }))
        setItems(newArr);
        setSearchData(newArr);
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
                Add An Item To Wishlist
            </DialogTitle>
            <SearchBar type={true} setSearchData={setSearchData} data={items} />
            <Grid container style={centering}>
                {searchData.length ?
                    <ItemList items={searchData} type="horizontal" handleAdd={handleAdd} itemRemove={itemRemove} />
                    :
                    <Typography variant="h5" sx={{ margin: "30px" }} >No item found.</Typography>
                }
            </Grid>
        </Dialog>
    )
}

export default AddWishlistItemDialog;

