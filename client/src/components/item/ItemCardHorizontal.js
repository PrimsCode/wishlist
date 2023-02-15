import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Paper } from '@mui/material';


const ItemCardHorizontal = ({ item, handleAdd, type, itemRemove }) => {
    const tag = { backgroundColor: item.color_code, color: "black", borderRadius: "8px", maxHeight: '20px', minHeight: '20px', fontSize: '10px' };

    let itemName;
    if (item.name.length > 20) {
        itemName = item.name.slice(0, 20) + "...";
    } else {
        itemName = item.name;
    }

    const handleDialog = () => {
        console.log(item.id)
        handleAdd(item.id);
        itemRemove(item.id);
    }

    const handleRefresh = () =>{
        window.location.reload();
    }


    return (

        <Paper sx={{ borderColor: `${item.color_code}`, boarder: '2px', m: 1, width: 230, height: 180 }}>
            <Typography variant="h6" fontSize="16px" sx={{ padding: 1 }}>
                {itemName}
            </Typography>

            <Grid container xs={12} sx={{ marginLeft: '10px' }}>
                <Button variant="contained" style={tag} >
                    {item.category}
                </Button>
            </Grid>

            <Grid container sx={{ display: 'flex', alignItem: 'center', justifyItems: 'center' }}>
                <Grid item sx={{ padding: 1 }} >
                    {type === "similar" ?
                    <Link replace to={`/items/${item.id}`} >
                        <img src={item.image_link} alt={item.name} style={{ maxWidth: '100px', maxHeight: '90px', overflow: 'hidden' }}  />
                    </Link>
                    :

                    <img src={item.image_link} alt={item.name} style={{ maxWidth: '100px', maxHeight: '90px', overflow: 'hidden' }}  />
                    }
                </Grid>

                {type !== "similar" &&
                    <Grid item sx={{ padding: 1 }}>
                        <Typography variant='body1' fontSize='16px'>
                            ${item.price}
                        </Typography>
                        <Button
                            variant="contained"
                            size="sm"
                            color="primary"
                            sx={{ ml: 'auto', fontWeight: 400, maxHeight: 35, minHeight: 35, minWidth: 50, maxWidth: 50 }}
                            value={item.id}
                            onClick={handleDialog}>
                            Add
                        </Button>
                    </Grid>
                }

            </Grid>
        </Paper>
    )
}

export default ItemCardHorizontal;