import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, MenuItem, FormControl, FormGroup, FormLabel, FormControlLabel, InputLabel, Select, Radio, RadioGroup, Switch } from '@mui/material';

import WishlistApi from '../../helpers/WishlistAPI';


const SearchFilter = ({ type, setFilter }) => {
    const centering = { display: "block", direction: "column", justifyContent: "center", alignItems: "center", margin: "20px" };
    const [temp, setTemp] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const getCategories = async () => {
            if (type === "items") {
                const itemCategories = await WishlistApi.getItemCategories();
                setCategories(itemCategories);
            } else {
                const wishlistCategories = await WishlistApi.getAllWishlistCategories();
                setCategories(wishlistCategories);
            }
        }
        getCategories();
    }, []);

    const handleOrderBy = (e) => {
        setData({...data, order: e.target.value});
    }

    const handleChange = (e) => {
        setChecked(e.target.checked);
    }

    const handleSearchCategory = (e) => {
        setData({...data, category: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilter(data);
    }

    return (

        <Grid container style={centering}>
            <Box >
                <FormGroup>
                    <InputLabel id="category-select">Search By Category:</InputLabel>
                    <FormControlLabel onChange={handleChange} checked={checked} control={<Switch />} label="Category" />
                </FormGroup>
                {checked === true &&
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <Select
                            labelId='category-select'
                            id="category-select"
                            name="category"
                            label="Item Category"
                            onChange={handleSearchCategory}>
                            {categories.map((category) => (
                                <MenuItem value={category.category}>{category.category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }

            </Box>
            <Box>
                {type === "items" ?
                    <FormControl>
                        <FormLabel id="items-order-by">Order By</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="items-order-by"
                            name="order"
                            defaultValue="title"
                            onChange={handleOrderBy}
                        >
                            <FormControlLabel value="title" control={<Radio />} label="Title" />
                            <FormControlLabel value="priceHigher" control={<Radio />} label="Price Low-High" />
                            <FormControlLabel value="priceLower" control={<Radio />} label="Price High-Low" />
                        </RadioGroup>
                    </FormControl>

                    :
                    <FormControl>
                        <FormLabel id="wishlists-order-by">Order By</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="wishlist-order-by"
                            name="order"
                            defaultValue="title"
                            onChange={handleOrderBy}
                        >
                            <FormControlLabel value="title" control={<Radio />} label="Title" />
                            <FormControlLabel value="username" control={<Radio />} label="Username" />
                        </RadioGroup>
                    </FormControl>

                }
            </Box>
            <Button onClick={handleSubmit}>Apply</Button>
        </Grid>
    )
}

export default SearchFilter;