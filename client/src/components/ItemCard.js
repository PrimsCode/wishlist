import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Typography, Button, Card, CardContent, Box} from '@mui/material';


const ItemCard = ({item, displayType, add}) => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
    const mainGrid = {border:"solid", minWidth:"100%", height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"};
    const tag = {backgroundColor:item.color_code, color:"black", borderRadius: "8px", maxHeight: '20px', minHeight: '20px', fontSize:'10px'};
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/items/${item.id}`);
      };

    let itemName;
    if (item.name.length > 25){
        itemName = item.name.slice(0, 22) + "...";
    } else {
        itemName = item.name;
    }
    console.log(item)

    return (
        <Card variant='outlined' 
                sx={{ width: 250, height: 300, margin: '15px' }} 
                style={centering} 
                key={item.id}
                onClick={handleClick}>

            <CardContent>
                <Box style={{align:"center"}}>
                    <Typography variant="h6" fontSize="16px" sx={{ mb: 0.5 }} style={{align:"center"}}>
                        {itemName}
                    </Typography>
                </Box>

                <Box>
                    <Button variant="contained" style={tag} >
                        {item.category}
                    </Button>
                </Box>

                <Box style={centering} sx={{margin: 2}}>
                    <img src={item.image_link} alt={item.name} style={{height:'130px', overflow:'hidden'}}/>
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
                    sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth:50 }}
                    value={item.id}
                    onClick={add}
                    >
                    Add
                    </Button>            
                }
                    
                </Box>
            </CardContent>
        </Card>

    )
}

export default ItemCard;