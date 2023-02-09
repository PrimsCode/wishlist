import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../helpers/UserContext';

import {AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = ({setToken, setUser}) => {
    const {user} = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClick = (url) => {
    navigate(url);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    navigate("/");
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <IconButton onClick={() => handleMenuClick('/')}>
                <HomeIcon style={{color: 'white'}}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                Wishlist
            </Typography>
            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>

              {user !== null && Object.keys(user).length > 0 ? 

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right',}}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClick(`/profile/${user.username}`)}>Profile</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/wishlists')}>Wishlists</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/items')}>Items</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              :
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right',}}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuClick('/login')}>Login</MenuItem>
              <MenuItem onClick={() => handleMenuClick('/register')}>Register</MenuItem>
            </Menu>
            }
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;