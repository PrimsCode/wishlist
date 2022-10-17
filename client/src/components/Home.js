import React from 'react';
import {Grid, Button, Typography} from '@mui/material';

const Home = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const mainGrid = {border:"solid", minWidth:"100%", height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"};

    return (
        <Grid container style={mainGrid}>
            <Grid item style={centering} >
                <Typography variant="h2">Wishlist</Typography>
            </Grid>
         
            <Grid item style={centering}>
                <Button variant="contained" color='primary'>Enter</Button>
            </Grid>
         
            {/* <Grid item xs={12} style={centering} margin="30px">
                <Typography variant='h1'>Jobly</Typography>
            </Grid>
            <Grid item xs={12} style={centering}>
                <Typography variant='h6'>All the jobs in one, convenient place.</Typography>
            </Grid>
            {user === null || user.length === 0 ?
                <Grid item xs={12} style={centering}>
                    <Button href="/login" variant='contained' style={{margin:"5px"}}>Log in</Button>
                    <Button href="/signup" variant='contained' style={{margin:"5px"}}>Sign up</Button>
                </Grid>
            :
                <Grid item xs={12} style={centering}>
                    <Typography variant='h3'>Welcome Back, {user.username}!</Typography>
                </Grid>         
        } */}
        </Grid>
    )
}

export default Home;