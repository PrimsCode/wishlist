import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import WishlistApi from '../../helpers/WishlistAPI';
import Loading from '../Loading';
import SearchBar from '../search//SearchBar';
import NewItemDialog from '../dialogs/NewItemDialog';
// import ItemScrapeDialog from './ItemScrapeDialog';
import ItemList from './ItemList';
import { mainContainer, centerBox } from '../../style';
import { useParams } from 'react-router-dom';

const ItemCategoryPage = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [categoryColor, setCategoryColor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        searchItems(category);
    }, []);

    const searchItems = async (searchQuery) => {
        let items = await WishlistApi.getAllItemsCategory(searchQuery);
        setItems(items.items);
        setCategoryColor(items.items[0].color_code);
        setIsLoading(true);
    }

    if (!isLoading) return <Loading />

    return (

        <>
            <Grid container style={centerBox} sx={{ backgroundColor: categoryColor, padding: "10px" }}>
                <Grid item xs={12} style={centerBox} magin="10px">
                    <Typography variant='h3'>{category}</Typography>
                </Grid>
            </Grid>

            <Grid container style={centerBox}>
                <ItemList items={items} type="vertical" />
            </Grid>
        </>
    )
}

export default ItemCategoryPage;