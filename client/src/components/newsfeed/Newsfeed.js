import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import WishlistApi from '../../helpers/WishlistAPI';
import Loading from '../Loading';
import SearchBar from '../search/SearchBar';
import SearchFilter from '../search/SearchFilter';
import WishlistList from './WishlistList';
import { mainContainer, centerBox } from '../../style';
import Post from './Post';

const Newsfeed = () => {
    // const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const [wishlists, setWishlists] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let queryStatement = "";

    useEffect(() => {
        setIsLoading(false);
        searchWishlists();
    }, []);

    const searchWishlists = async (searchQuery) => {
        let wishlists = await WishlistApi.getAllWishlists(searchQuery);
        setWishlists(wishlists);
        setSearchData(wishlists);
        setIsLoading(true);
    }

    const searchReset = async (filter) => {
        let wishlists = await WishlistApi.getAllWishlistsFilter(`? + ${filter}`);
        setSearchData(wishlists);
        setIsLoading(true);
    }

    if(filter){
        if(filter.order && filter.category){
            queryStatement = `?category=${filter.category}&orderBy=${filter.order}`;
        } else if (filter.category){
            queryStatement = `?category=${filter.category}`;
        } else {
            queryStatement = `?orderBy=${filter.order}`;
        }

        searchReset(queryStatement);
    }

    if (!isLoading) return <Loading />

    return (
        <Grid container sx={mainContainer}>
            <Grid container xs={12} style={centerBox} margin='20px'>
                <Typography variant='h2'>Wishlists</Typography>
            </Grid>
{/* 
            <Grid container style={centerBox}>
                <SearchBar type="wishlists" setSearchData={setSearchData} data={wishlists} />
            </Grid>
            <Grid container>
                <SearchFilter type="wishlists" setFilter={setFilter} />
            </Grid>

            <Grid container style={centerBox}>
                {searchData.length ?
                    <WishlistList wishlists={searchData} />
                    :
                    <Typography variant="h5" sx={{ margin: "30px" }} >No Wishlist found.</Typography>
                }
            </Grid> */}

        </Grid>
    )
}

export default Newsfeed;