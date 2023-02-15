import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, FormControl, TextField, Button, Dialog, DialogTitle, Select, MenuItem, InputLabel} from '@mui/material';
import UserContext from '../helpers/UserContext';
import WishlistApi from '../helpers/WishlistAPI';
import Loading from './Loading';
import scrapeItem from '../hooks/scraper';

const ItemScrapeDialog = (props) => {
    const {onClose, createNewItem, open} = props;
    const [itemData, setItemData] = useState({});
    const [categories, setCategories] = useState([]);
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {
        name:"",
        price: "",
        description:"",
        link:"",
        category:"",
        imageLink:""
    };

    useEffect(() => {
        const getCategories = async() => {
            const itemCategories = await WishlistApi.getItemCategories();
            setCategories(itemCategories);
        }
        setItemData(initialState);
        getCategories();
    },[]);
    

    const [error, setError] = useState({
        state: false,
        message: ""
    });

    //handle form change, submit, and validate if all data are inputted
    const handleChange = (e) => {
        setUrl(e.target.value);
        console.log(url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation() === true){
            const info = await scrapeItem(url);
            itemData.name = info.name;
            itemData.price = info.price;
            itemData.description = info.description;
            itemData.imageLink = info.imageLink;
            await createNewItem(itemData);
            onClose();
        }
    }

    const handleValidation = () => {
        if (!itemData.link && !itemData.category){
            alert(`Please select a category and add a link`);
            return false;
        }
        return true;
    }

    const handleError = (msg) => {
        setError({state:true, message: msg});
        setTimeout(() => {
            setError({state:false, message: ""});
        }, 5000);
    }

    //form to create a new item
    return (

        <Dialog onClose={onClose} open={open}>
        <DialogTitle>
            Add A New Item From Amazon             
        </DialogTitle>

            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                    labelId='category-select'
                    id="category-select"
                    name="category"
                    label="Item Category"
                    value={itemData.category}
                    onChange={handleChange}>
                        {categories.map((category) => (
                            <MenuItem value={category.category}>{category.category}</MenuItem>
                        ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                    type="text"
                    id="amazon-url"
                    name="url"
                    label="Amazon Product URL"
                    value={itemData.link}
                    onChange={handleChange}/>
            </FormControl>
            
        <Button onClick={handleSubmit} variant="contained" color="primary" style={{margin:'10px'}}>Submit</Button>
    </Dialog>
            
    )
}

export default ItemScrapeDialog;