import React, {useContext, useState} from 'react';
import {Grid, Typography, Button} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import UserContext from '../helpers/UserContext';

const UserProfile = () => {
    const {user} = useContext(UserContext);

    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const container = {
        display: "flex",
        flexDirection: "column",
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
      };
    const imgStyle = {width: "200px", height: "200px", overflow: "hidden",borderRadius:"50%"}; 
    
    return (
        <Grid container style={centering}>
            <Grid item xs={12} style={centering}>
                <img src={user.profilePic} alt={user.username} style={imgStyle}></img>
            </Grid>

            <Grid item xs={12} style={centering}>
                <Typography variant='h3'>{user.username}</Typography>
            </Grid>

            <Grid item xs={12} style={centering}>
                <Button variant="contained" color="primary" style={{margin:'10px'}}>
                    Add Wishlist
                    </Button>
                <Button variant="contained" color="primary" style={{margin:'10px'}}>
                    Add Item
                    </Button>
            </Grid>

            <Grid item xs={12} style={centering}>
                
            </Grid>


        </Grid>
    )
}

export default UserProfile;