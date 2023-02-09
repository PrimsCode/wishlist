import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, FormControl, TextField, Button, Dialog, DialogTitle, Select, MenuItem, InputLabel} from '@mui/material';
import UserContext from '../helpers/UserContext';
import WishlistApi from '../helpers/WishlistAPI';
import Loading from './Loading';

const NewItemDialog = (props) => {
    const {onClose, createNewItem, open} = props;
    const [formData, setFormData] = useState({});
    const [form, setForm] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {
        name:"",
        price: "",
        description:"",
        link:"",
        category:"",
        imageLink:""
    };

    const initialForm = [
        {type:"text", name:"name", label:"Name"},
        {type:"number", name:"price", label:"Price"},
        {type:"text", name:"description", label:"Item Description"},
        {type:"text", name:"link", label:"Link"},
        {type:"text", name:"imageLink", label:"Image Link"}
    ];

    useEffect(() => {
        const getCategories = async() => {
            const itemCategories = await WishlistApi.getItemCategories();
            setCategories(itemCategories);
        }
        setForm(initialForm);
        setFormData(initialState);
        getCategories();
    },[]);
    

    const [error, setError] = useState({
        state: false,
        message: ""
    });

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
        if (handleValidation() === true){
            formData.price = parseFloat(formData.price);
            await createNewItem(formData);
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

    //form to create a new item
    return (

        <Dialog onClose={onClose} open={open}>
        <DialogTitle>
            Add A New Item              
        </DialogTitle>

            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                    labelId='category-select'
                    id="category-select"
                    name="category"
                    label="Item Category"
                    value={formData.category}
                    onChange={handleChange}>
                        {categories.map((category) => (
                            <MenuItem value={category.category}>{category.category}</MenuItem>
                        ))}
                </Select>
            </FormControl>

            {form.map((data) => (
                 <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <TextField
                        type={data.type}
                        id={data.name}
                        name={data.name}
                        label={data.label}
                        value={formData[data.name]}
                        onChange={handleChange} />
                </FormControl>
            ))}
            
        <Button onClick={handleSubmit} variant="contained" color="primary" style={{margin:'10px'}}>Submit</Button>
    </Dialog>
            
    )
}

export default NewItemDialog;