import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogTitle, FormControl, TextField, Select, InputLabel, MenuItem} from '@mui/material';

import WishlistApi from '../helpers/WishlistAPI';
import Loading from './Loading';

const WishlistDialog = (props) => {
    // const initialState = {
    //     username:user.username,
    //     category:"",
    //     description:""
    // }

    const [isLoading, setIsLoading] = useState(false);


    const {onClose, createNewWishlist, open, user} = props;
    const [formData, setFormData] = useState({
        username:user.username,
        category:"",
        title:"",
        description:"",
        bannerImg:""
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState({
        state: false,
        message: ""
    });

    const formStyle = { m: 1, width: 300, alignItems: "center" };

    useEffect(() => {
        const getCategories = async() => {
            const wishlistCategories = await WishlistApi.getAllWishlistCategories();
            setCategories(wishlistCategories);
            console.log(wishlistCategories);
        }
        getCategories();
    },[]);

    console.log(props)

    if(!user.username) return <Loading />

    // if(!isLoading) return <Loading />

     //handle form change, submit, and validate if all data are inputted
     const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`You have submitted ${formData}`);
        if (handleValidation() === true){
            await createNewWishlist(formData);
            onClose();
        }
    }

    const handleValidation = () => {
        for (let key in formData){
            if (formData[key].length === 0){
                alert(`${key} was not filled!`)
                return false;
            }
        }
        return true;
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
                Add A New Wishlist                
            </DialogTitle>

                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId='category-select-label'
                        id="category-select"
                        name="category"
                        label="Wishlist Category"
                        value={formData.category}
                        onChange={handleChange}>
                            {categories.map((category) => (
                                <MenuItem value={category.category}>{category.category}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <TextField
                        type="text"
                        id="title"
                        name="title"
                        label="Wishlist Title"
                        value={formData.title}
                        onChange={handleChange} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <TextField
                        type="text"
                        id="description"
                        name="description"
                        label="Wishlist Description"
                        value={formData.description}
                        onChange={handleChange} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <TextField
                        type="text"
                        id="bannerImg"
                        name="bannerImg"
                        label="Wishlist Banner Image"
                        value={formData.bannerImg}
                        onChange={handleChange} />
                </FormControl>

            <Button onClick={handleSubmit} variant="contained" color="primary" style={{margin:'10px'}}>Submit</Button>
        </Dialog>
    )

}

export default WishlistDialog;