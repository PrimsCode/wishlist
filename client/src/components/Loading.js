import React from "react";
import {Grid, CircularProgress} from '@mui/material';

//show loading circular animation while information is loading

function Loading() {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
  return (
    <Grid container style={centering}>
      <CircularProgress />
    </Grid>
  );
}

export default Loading;