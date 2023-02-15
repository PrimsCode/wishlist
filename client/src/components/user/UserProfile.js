import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import WishlistApi from '../../helpers/WishlistAPI';
import UserContext from '../../helpers/UserContext';
import Loading from '../Loading';
import WishlistCard from '../wishlist/WishlistCard';
import WishlistDialog from '../dialogs/WishlistDialog';
import { useParams } from 'react-router-dom';
import { mainContainer, profileAvatar, centerBoxMargin } from '../../style';

const UserProfile = () => {
    const { username } = useParams();
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState([]);
    const [wishlists, setWishlists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const getWishlists = async () => {
        const foundWishlists = await WishlistApi.getUserWishlists(username);
        setWishlists(foundWishlists);
        setIsLoading(true);
    }

    const getProfile = async () => {
        const userProfile = await WishlistApi.getUser(username)
        setProfile(userProfile);
    }

    useEffect(() => {
        setIsLoading(false);
        if (user.username === username) {
            setProfile(user);
        } else {
            getProfile();
        }
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
            { category: data.category, title: data.title, description: data.description, bannerImg: data.bannerImg });
        setWishlists(oldWishlist => [...oldWishlist, newWishlist]);
        console.log(wishlists);
        getWishlists();
    }

    //styling
    const centerText = { display: "flex", justifyContent: "center", alignItems: "center" };


    return (
        <Grid container style={mainContainer}>
            <Grid item xs={12} style={centerBoxMargin}>
                <img src={profile.profilePic} alt={profile.username} style={profileAvatar}></img>
            </Grid>

            <Grid item xs={12} style={centerText}>
                <Typography variant='h3'>{profile.firstName} {profile.lastName}</Typography>
            </Grid>

            <Grid item xs={12} style={centerText}>
                <Typography variant='h6'>@{profile.username}</Typography>
            </Grid>

            {user.username === username &&
                <Grid item xs={12} style={centerBoxMargin}>
                    <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleOpen}>
                        Add Wishlist
                    </Button>
                    <WishlistDialog createNewWishlist={createNewWishlist} open={open} onClose={handleClose} user={user} />
                </Grid>
            }

            <Grid item xs={12} style={centerBoxMargin}>
                {isLoading === false &&
                    <Loading />
                }

                {wishlists.length ?
                    <div style={{ display: 'flex' }}>
                        {wishlists.map((wishlist) => (
                            <WishlistCard wishlist={wishlist} user={user} getWishlists={getWishlists} />
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