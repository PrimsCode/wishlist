import React from 'react';
import {Grid, Typography} from '@mui/material';
import ItemCard from './ItemCard';
import ItemCardHorizontal from './ItemCardHorizontal';

const ItemList = ({items, type, handleAdd}) => {

    return (
        <>
        {items.length ?
            <>
            {items.map(item => (
                <>
                
                {type == "vertical" ? 
                    <Grid item xs={12} sm={6} md={4} lg={3}> 
                        <ItemCard item={item} /> 
                    </Grid>
                :
                    <Grid item sx={{display:"block"}} > 
                        <ItemCardHorizontal item={item} handleAdd={handleAdd} /> 
                    </Grid>
                }

                </>
            ))}
            </>
            :
            <Typography variant="h5" sx={{margin:"30px"}} >No item found.</Typography>
            }
        </>
    )
}

export default ItemList;