import React from 'react';
import {Typography, Button, Grid, Paper} from '@mui/material';


const ItemCardHorizontal = ({item, handleAdd}) => {
    let itemName;
    if (item.name.length > 20){
        itemName = item.name.slice(0, 20) + "...";
    } else {
        itemName = item.name;
    }
    console.log(item)

    return (

        <Paper sx={{backgroundColor:`${item.color_code}`, m: 1, width: 230, height: 150}} >
            <Typography variant="h6" fontSize="16px" sx={{padding:1}}>
                {itemName}
            </Typography>
            <Grid container>
                <Grid item sx={{padding:1}}>
                    <img src={item.image_link} alt={item.name} style={{height:'75px', overflow:'hidden'}}/>
                </Grid>
                <Grid item sx={{padding:1}}>
                    <Typography variant='body1' fontSize='16px'>
                    ${item.price}
                    </Typography>

                    <Button 
                    variant="contained"
                    size="sm"
                    color="primary"
                    sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth:50 }}
                    value={item.id}
                    onClick={handleAdd}>
                    Add
                    </Button> 
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ItemCardHorizontal;