import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import WishlistApi from '../../helpers/WishlistAPI';
import UserContext from '../../helpers/UserContext';
import Loading from '../Loading';
import ItemCard from '../item/ItemCard';
import { useParams, Link } from 'react-router-dom';
import AddWishlistItemDialog from '../dialogs/AddWishlistItemDialog';
import { centerBox } from '../../style';

const Wishlist = () => {
    const { username, wishlistCategory, wishlistTitle } = useParams();
    const { user } = useContext(UserContext);
    const [currUser, setCurrUser] = useState(user);
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const imgStyle = { margin: "5px", width: "150px", height: "150px", overflow: "hidden", borderRadius: "50%", objectFit: "cover" };

    useEffect(() => {
        setIsLoading(false);
        getWishlist();
    }, [])

    const getWishlist = async () => {
        const foundWishlist = await WishlistApi.getUserWishlistByTitle(username, wishlistCategory, wishlistTitle);
        setWishlist(foundWishlist);
        if (foundWishlist.username !== user.username) {
            const wishlistUser = await WishlistApi.getUser(foundWishlist.username);
            setCurrUser(wishlistUser);

        }
        setIsLoading(true);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        getWishlist();
    }

    const handleAdd = async (itemId) => {
        console.log(itemId);
        await WishlistApi.addItemToUserWishlist(username, wishlistCategory, wishlistTitle, itemId);
    }

    if (!isLoading) return <Loading />

    return (
        <>
            <Grid container style={centerBox} sx={{ backgroundColor: wishlist.color_code, padding: "10px" }}>
                <Grid item xs={12} style={centerBox} magin="10px">
                    <Link to={`/profile/${currUser.username}`} >
                        <img src={currUser.profilePic} alt={currUser.username} style={imgStyle} />
                    </Link>
                </Grid>

                <Grid item xs={12} style={centerBox}>
                    <Typography variant='h3'>{wishlist.title}</Typography>
                </Grid>

                <Grid item xs={12} style={centerBox}>
                    <Typography variant='h6'>{wishlist.description}</Typography>
                </Grid>
            </Grid>

            {wishlist.username === user.username &&
                <Grid container>
                    <Grid item xs={12} style={centerBox}>
                        <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleOpen}>
                            Add Items
                        </Button>
                        <AddWishlistItemDialog open={open} onClose={handleClose} handleAdd={handleAdd} currItems={wishlist.items} />
                    </Grid>
                </Grid>
            }

            <Grid container style={centerBox}>
                {isLoading === false && <Loading />}
                {wishlist.items.length ?
                    <>
                        {wishlist.items.map(item => (
                            <Grid item xs={12} sm={6} md={4.5} lg={2.5}>
                                <ItemCard item={item} displayType="userWishlist" />
                            </Grid>
                        ))}
                    </>
                    :
                    <Typography variant="h5" >There are no items in this wishlist.</Typography>
                }
            </Grid>
        </>
    )
}

export default Wishlist;