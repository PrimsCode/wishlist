import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, FormControl, TextField, Button, Paper, Alert} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';

const AuthForm = ({setToken, user, getCurrentUser, formType = "register"}) => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const formStyle = { m: 1, width: 300, alignItems: "center" };
    const container = {
        display: "flex",
        flexDirection: "column",
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
      };

    const initialState = {
        username:"",
        password:""
    }
    const setForm = [
        {type:"text", name:"username", label:"Username"},
        {type:"password", name:"password", label:"Password"}
    ]

    if (formType === "register") {
        initialState.firstName ="";
        initialState.lastName ="";
        initialState.profilePic ="";
        setForm.push(
        {type:"text", name:"firstName", label:"First Name"},
        {type:"text", name:"lastName", label:"Last Name"},
        {type:"text", name:"profilePic", label:"Profile Picture Link"})
    }

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState({
        state: false,
        message: ""
    });

    // const navigate = useNavigate();
    
    // if(user !== null && Object.keys(user).length > 0){
    //     navigate('/profile');
    // }

    async function register(data) {
        try {
          let token = await WishlistApi.registerNewUser(data);
          localStorage.setItem("token", token);
          setToken(token);
          getCurrentUser(token);
        //   handleSuccess();
          return { success: true };
        } catch (errors) {
          console.error("signup failed", errors);
          handleError(errors);
        }
      }

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
            register(formData);
            setFormData();
        }
        return ;
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

    const handleError = (errMsg) => {
        setError({state:true, message: errMsg});
        setTimeout(() => {
            setError({state:false, message: ""});
        }, 5000);
    }

    //form to create a new user
    return (
        <Grid container style={centering}>
            <Grid item xs={12}>
                {error.state == true && 
                    <Alert severity='error'>{error.message} -- try again!</Alert>
                }
            </Grid>
            <Paper style={container}>
            <Typography variant="h4" style={{marginBottom:'10px'}}>Register</Typography>
            {setForm.map((data) => (
                 <FormControl sx={formStyle}>
                    <TextField
                        type={data.type}
                        id={data.name}
                        name={data.name}
                        label={data.label}
                        value={formData[data.name]}
                        onChange={handleChange} />
                </FormControl>
            ))}
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{margin:'10px'}}>Register</Button>
            </Paper>
        </Grid>
        )
}

export default AuthForm