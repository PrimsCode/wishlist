import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Avatar,
        Typography, 
        Button, 
        Card, 
        CardHeader, 
        CardActions, 
        CardContent,
        CardMedia} from '@mui/material';

const WishlistCard = ({wishlist}) => {
    const navigate = useNavigate();

    let firstLetter;

    if(wishlist) firstLetter = wishlist.category.charAt(0).toUpperCase();

    let bannerImg;
    if(wishlist.banner_img){
        bannerImg = wishlist.banner_img;
    } else {
        bannerImg = 'https://thumbs.dreamstime.com/b/vector-illustration-wishlist-inscription-birthday-party-brush-lettering-modern-calligraphy-desirable-gifts-vector-144278682.jpg';
    }

    const handleClick = () => {
        navigate(`/wishlists/${wishlist.username}/${wishlist.category}/${wishlist.title}`);
      };

    return (
        <Card sx={{ width: 250, margin:'10px' }} key={wishlist.id}>
            {wishlist.profile_pic ? 
                <CardHeader
                    avatar={<Avatar alt={wishlist.username} src={wishlist.profile_pic} />}
                    title={wishlist.title}
                    subheader={wishlist.category}
                    />
            :
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: wishlist.color_code}} aria-label={wishlist.category}>
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

        <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <ShareIcon />
            </IconButton>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore> */}
            <Button variant="contained" size="sm" color="primary"
                    sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth:50 }}
                    onClick={handleClick}>
                    Visit
            </Button>
        </CardActions>
      </Card>
    )
}

export default WishlistCard;