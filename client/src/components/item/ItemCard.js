import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Box } from '@mui/material';
import { centerBox } from '../../style';

const ItemCard = ({ item, displayType, add, handleDelete }) => {
    const tag = { backgroundColor: item.color_code, color: "black", borderRadius: "8px", maxHeight: '20px', minHeight: '20px', fontSize: '10px' };
    const navigate = useNavigate();

    console.log(displayType)

    const handleClickItem = () => {
        navigate(`/items/${item.id}`);
    };

    const handleClickCategory = () => {
        navigate(`/items/categories/${item.category}`);
    };

    let itemName;
    if (item.name.length > 20) {
        itemName = item.name.slice(0, 20) + "...";
    } else {
        itemName = item.name;
    }

    return (
        <Card variant='outlined'
            sx={{ width: 230, height: 280, margin: '10px' }}
            style={centerBox}
            key={item.id}
        >

            <CardContent>
                <Box style={{ align: "center" }}>
                    <Typography variant="h6" fontSize="16px" style={{ align: "center" }}>
                        {itemName}
                    </Typography>
                </Box>

                <Box>
                    <Button variant="contained" style={tag} onClick={handleClickCategory}>
                        {item.category}
                    </Button>
                </Box>

                <Box style={centerBox} onClick={handleClickItem} sx={{marginTop: "5px", marginBottom:"5px"}}>
                    <Button>
                        <img src={item.image_link} alt={item.name} style={{ maxWidth: '180px', maxHeight: '130px', overflow: 'hidden' }} />
                    </Button>
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <div>
                        <Typography variant="body2">Price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg">${item.price}</Typography>
                    </div>

                    {displayType === "toAdd" &&
                        <Button
                            variant="contained"
                            size="sm"
                            color="primary"
                            sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth: 50 }}
                            value={item.id}
                            onClick={add}
                        >
                            Add
                        </Button>
                    }

                    {displayType === "userWishlist" &&
                        <Button
                            variant="contained"
                            size="sm"
                            color="primary"
                            sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth: 50, fontSize: 10 }}
                            value={item.id}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    }

                </Box>
            </CardContent>
        </Card>

    )
}

export default ItemCard;