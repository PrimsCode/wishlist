import React, {useContext} from 'react';
import {Grid, Button, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../helpers/UserContext';

const Home = () => {
    const {user} = useContext(UserContext);
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    // const mainGrid = {border:"solid", minWidth:"100%", height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"};
    const navigate = useNavigate();

    const handleClick = () => {
        if (user !== null) {
            navigate(`/profile/${user.username}`)
        };
        navigate('/register');
      };

    return (
        <Grid container style={centering}>
            <Grid item xs={12} style={centering} marginTop="20%">
                <Typography variant='h2'>Wishlist</Typography>
            </Grid>
            <Grid item xs={12} style={centering}>
                <Button variant="contained" color='primary' onClick={handleClick}>Enter</Button>
            </Grid>
        </Grid>
    )
}

export default Home;