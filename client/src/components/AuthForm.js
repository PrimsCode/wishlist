import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, FormControl, TextField, Button, Paper, Alert} from '@mui/material';
import UserContext from '../helpers/UserContext';
import Loading from './Loading';

const AuthForm = ({userFunction, formType}) => {
    const {user} = useContext(UserContext);
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const formStyle = { m: 1, width: 300, alignItems: "center" };
    const container = {
        display: "flex",
        flexDirection: "column",
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
      };

    const [formData, setFormData] = useState({});
    const [form, setForm] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loginDataState = {
        username:"",
        password:""
    };

    const loginStateForm = [
        {type:"text", name:"username", label:"Username"},
        {type:"password", name:"password", label:"Password"}
    ];

    const registerDataState ={
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        profilePic:""
    };

    const registerStateForm = [
        {type:"text", name:"username", label:"Username"},
        {type:"password", name:"password", label:"Password"},
        {type:"text", name:"firstName", label:"First Name"},
        {type:"text", name:"lastName", label:"Last Name"},
        {type:"text", name:"profilePic", label:"Profile Picture Link"}
    ];

    useEffect(() => {
        if (formType === "register") {
            setForm(registerStateForm);
            setFormData(registerDataState);
            setIsLoading(true);
        } else {
            setFormData(loginDataState);
            setForm(loginStateForm);
            setIsLoading(true);
        }
    },[formType]);
    

    const [error, setError] = useState({
        state: false,
        message: ""
    });

    const navigate = useNavigate();
    
    if(user !== null && Object.keys(user).length > 0){
        navigate(`/profile/${user.username}`);
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
            const saveUser = await userFunction(formData);
            if(!saveUser) handleError("Failed! Please try again!");
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

    if(!isLoading) return <Loading />;

    //form to create a new user
    return (
        <Grid container style={centering}>
            <Grid item xs={12}>
                {error.state === true && 
                    <Alert severity='error'>{error.message} -- try again!</Alert>
                }
            </Grid>
            <Paper style={container}>

            {formType === 'register' ? 
                <div>
                    <Typography variant="h4" style={{marginBottom:'10px'}}>Register</Typography>
                    <Typography variant="body1">Already registered? Go to <a href="/login">Login</a></Typography>
                </div>
                
                :
                <div>
                    <Typography variant="h4" style={{marginBottom:'10px'}}>Login</Typography>
                    <Typography variant="body1">Haven't registered? Go to <a href="/register">Register</a></Typography>
                </div>
            }
            
            {form.map((data) => (
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

                <Button onClick={handleSubmit} variant="contained" color="primary" style={{margin:'10px'}}>Submit</Button>
            </Paper>
        </Grid>
        )
}

export default AuthForm