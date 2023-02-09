import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography, Button} from '@mui/material';
import WishlistApi from '../helpers/WishlistAPI';
import UserContext from '../helpers/UserContext';
import Loading from './Loading';
import WishlistCard from './WishlistCard';
import WishlistDialog from './WishlistDialog';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const {username} = useParams();
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState([]);
    const [wishlists, setWishlists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const getWishlists = async() => {
        if(user.username == username){
            const foundWishlists = await WishlistApi.getUserWishlists(user.username);
            setProfile(user);
            setWishlists(foundWishlists);
            setIsLoading(true);
        } else {
            const foundWishlists = await WishlistApi.getUserWishlists(username);
            const userProfile = await WishlistApi.getUser(username)
            setProfile(userProfile);
            setWishlists(foundWishlists);
            setIsLoading(true);
        }
    }

    useEffect(()=> {
        setIsLoading(false);
        getWishlists();
    }, [username])

    //working with Wishlist Dialog box to create a new wishlist
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        getWishlists();
    }

    const createNewWishlist = async (data) => {
        const newWishlist = await WishlistApi.createUserWishlist(data.username, 
            {category:data.category, title:data.title, description:data.description, bannerImg:data.bannerImg });
        setWishlists(oldWishlist => [...oldWishlist, newWishlist]);
        console.log(wishlists);
        getWishlists();
    }

    //styling
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const centerText = {display: "flex", justifyContent: "center", alignItems:"center"};
    const imgStyle = {width: "200px", height: "200px", overflow: "hidden", borderRadius:"50%", objectFit:"cover"}; 
    
    return (
        <Grid container style={centering}>
            <Grid item xs={12} style={centering}>
                <img src={profile.profilePic} alt={profile.username} style={imgStyle}></img>
            </Grid>

            <Grid item xs={12} style={centerText}>
                <Typography variant='h3'>{profile.firstName} {profile.lastName}</Typography>
            </Grid>

            <Grid item xs={12} style={centerText}>
                <Typography variant='h6'>@{profile.username}</Typography>
            </Grid>

            {user.username == username &&
                <Grid item xs={12} style={centering}>
                    <Button variant="contained" color="primary" style={{margin:'10px'}} onClick={handleOpen}>
                        Add Wishlist
                    </Button>
                    <WishlistDialog createNewWishlist={createNewWishlist} open={open} onClose={handleClose} user={user}/>
                </Grid>
            }

            <Grid item xs={12} style={centering}>
                {isLoading === false &&
                    <Loading />
                }

                {wishlists.length ?
                    <div style={{display: 'flex'}}>
                        {wishlists.map((wishlist) => (
                            <WishlistCard wishlist={wishlist} />
                        ))}
                    </div>
                :
                <Typography variant="h5" >No Wishlist Yet!</Typography>
                 }
                
            </Grid>
        </Grid>
    )
}

export default UserProfile;