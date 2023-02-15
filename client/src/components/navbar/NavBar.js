import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../helpers/UserContext';
//style
import {AppBar, Toolbar, Typography, IconButton, 
          MenuItem, Menu, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({setToken, setUser}) => {
  const {user} = useContext(UserContext);
  //setting menu hover
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  //handlers
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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}} color="customLightGrey">
        <Toolbar>

        {user !== null && Object.keys(user).length > 0 &&
            <IconButton onClick={() => handleMenuClick('/')}>
              <Avatar alt={user.username} src={user.profilePic} />
            </IconButton>
          }

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
                <MenuItem onClick={() => handleMenuClick(`/profile/${user.username}/edit`)}>Edit Profile</MenuItem>
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

  );
}

export default NavBar;