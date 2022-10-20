import React, { useState } from 'react';
import {Grid, IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({type, search}) => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const searchBox = {width: '55vw'};

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setSearchQuery(searchQuery);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        search(searchQuery);
    }

    return (
        <Grid container style={centering}>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="search-bar" 
                    name="text" 
                    label={`Enter a ${type}`}
                    placeholder="Search..."
                    variant='outlined'
                    style={searchBox}
                    onChange={handleChange}
                />
                <IconButton type="submit" aria-label='search'>
                    <SearchIcon fontSize="large" color="primary" />
                </IconButton>
            </form>
        </Grid>
    )
}

export default SearchBar;