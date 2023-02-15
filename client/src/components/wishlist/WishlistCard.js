import React from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistApi from '../../helpers/WishlistAPI';
import {
    Avatar,
    Typography,
    Button,
    IconButton,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    CardMedia
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const WishlistCard = ({ wishlist, user, getWishlists }) => {
    const navigate = useNavigate();

    let firstLetter;

    if (wishlist.category) firstLetter = wishlist.category.charAt(0).toUpperCase();

    let bannerImg;
    if (wishlist.banner_img) {
        bannerImg = wishlist.banner_img;
    } else {
        bannerImg = 'https://thumbs.dreamstime.com/b/vector-illustration-wishlist-inscription-birthday-party-brush-lettering-modern-calligraphy-desirable-gifts-vector-144278682.jpg';
    }

    const handleClick = () => {
        navigate(`/wishlists/${wishlist.username}/${wishlist.category}/${wishlist.title}`);
    };

    const handleDelete = async () => {
        await WishlistApi.deleteWishlist(wishlist.username, wishlist.category, wishlist.title);
        getWishlists();
    }

    return (
        <Card sx={{ width: 250, margin: '10px' }} key={wishlist.id}>
            {wishlist.profile_pic ?
                <CardHeader
                    avatar={<Avatar alt={wishlist.username} src={wishlist.profile_pic} />}
                    title={wishlist.title}
                    subheader={wishlist.category}
                />
                :
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: wishlist.color_code }} aria-label={wishlist.category}>
                            {firstLetter}
                        </Avatar>}
                    title={wishlist.title}
                    subheader={wishlist.category}
                />
            }

            <CardMedia
                component="img"
                height="100"
                image={bannerImg}
                // backgroundColor={wishlist.color_code}
                alt={wishlist.title}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {wishlist.description}
                </Typography>
            </CardContent>

            <CardActions>

                {user && user.username === wishlist.username &&

                    <IconButton variant="contained" size="sm" color="primary" sx={{ ml: 'auto' }} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>

                }

                <Button
                    variant="contained"
                    size="sm"
                    color="primary"
                    sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth: 50 }}
                    value={wishlist.id}
                    onClick={handleClick}>
                    View
                </Button>

            </CardActions>


        </Card>
    )
}

export default WishlistCard;