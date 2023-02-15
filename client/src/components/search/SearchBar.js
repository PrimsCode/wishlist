import React, { useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ type, setSearchData, data }) => {
    const centering = { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px" };
    const [temp, setTemp] = useState([]);

    const handleFilter = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        console.log(searchQuery)
        const newFilter = data.filter((data) => {
            if (type) {
                return data.name.toLowerCase().includes(searchQuery);
            } else {
                return data.title.toLowerCase().includes(searchQuery);
            }
        })

        if (searchQuery === "") {
            setSearchData(data);
            setTemp([]);
        } else {
            setSearchData(newFilter);
            setTemp(newFilter);
        }
    }

    const handleClearInput = (e) => {
        setTemp([]);
        setSearchData(data);
    }

    return (

        <Grid container style={centering}>
            <Grid item>
                <TextField
                    id="search-bar"
                    className="search__input"
                    onChange={handleFilter}
                    label="Enter your search"
                    variant="outlined"
                    sx={{ m: 1, minWidth: 500 }}
                />
                <IconButton type="submit" aria-label='search'>
                    {temp.length === 0 ?
                        <SearchIcon fontSize="large" color="primary" />
                        :
                        <CloseIcon fontSize="large" color="primary" onClick={handleClearInput} />
                    }
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default SearchBar;