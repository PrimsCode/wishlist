import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../helpers/UserContext';
import NavBar from './NavBar';

//style
import {
  Box, Drawer, Toolbar, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';

//icons

import ListAltIcon from '@mui/icons-material/ListAlt';
import RedeemIcon from '@mui/icons-material/Redeem';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = "22vh";

function NavSideBar({ setToken, setUser, box }) {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const sideBar = [
    { title: "Wishlists", icon: <ListAltIcon />, link: `/wishlists` },
    { title: "Items", icon: <RedeemIcon />, link: `/items` }
  ];

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar setToken={setToken} setUser={setUser} />

      {user !== null && Object.keys(user).length > 0 &&
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />

          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem key="profile" disablePadding onClick={() => handleClick(`/profile/${user.username}`)}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem key="favorites" disablePadding onClick={() => handleClick(`/favorites/${user.username}`)}>
                <ListItemButton>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites" />
                </ListItemButton>
              </ListItem>
              <ListItem key="social" disablePadding onClick={() => handleClick(`/social/${user.username}`)}>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Social" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />

            <List>
              {sideBar.map((context) => (
                <ListItem key={user.title} disablePadding onClick={() => handleClick(`${context.link}`)}>
                  <ListItemButton>
                    <ListItemIcon>
                      {context.icon}
                    </ListItemIcon>
                    <ListItemText primary={context.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

          </Box>
        </Drawer>
      }

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {box}
      </Box>

    </Box>

  );
}

export default NavSideBar;