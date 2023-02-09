import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import Loading from './Loading';
import SearchBar from './SearchBar';
import WishlistList from './WishlistList';

const WishlistPage = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const [wishlists, setWishlists] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(false);
        searchWishlists();
    }, []);

    const searchWishlists = async(searchQuery) => {
        let wishlists = await WishlistApi.getAllWishlists(searchQuery);
        setWishlists(wishlists);
        setSearchData(wishlists);
        setIsLoading(true);
    }

    if(!isLoading) return <Loading />

    return (
        <>
        <Grid container xs={12} style={centering} margin='20px'>
            <Typography variant='h2'>Wishlists</Typography>
        </Grid>

        <Grid container style={centering}>
            <SearchBar setSearchData={setSearchData} data={wishlists} />
        </Grid>

        <Grid container style={centering}>
            {searchData.length ? 
                <WishlistList wishlists={searchData} />
            :
                <Typography variant="h5" sx={{margin:"30px"}} >No Wishlist found.</Typography>
            }
        </Grid>

        </>
    )
}

export default WishlistPage;