// import React, {useContext} from 'react';
// import {Grid, Button, Typography} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import UserContext from '../helpers/UserContext';
// import NavSideBar from './NavSideBar';

// const Home = () => {
//     const {user} = useContext(UserContext);
//     const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
//     // const mainGrid = {border:"solid", minWidth:"100%", height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"};
//     const navigate = useNavigate();

//     const handleClick = () => {
//         if (user !== null) {
//             navigate(`/profile/${user.username}`)
//         };
//         navigate('/register');
//       };

//     return (
//         <>
//         <NavSideBar />
//         <Typography>Hello</Typography>

//         </>

//     )
// }

// export default Home;