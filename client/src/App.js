import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//backend, helpers, & hooks
import WishlistApi from './helpers/WishlistAPI';
import jwt from "webcrypto-jwt";
import UserContext from './helpers/UserContext';
import useLocalStorage from './hooks/useLocalStoage';

//components
import NavSideBar from './components/navbar/NavSideBar';
import Home from './components/Home'
import Landing from './components/Landing';
import AuthForm from './components/form/AuthForm';
import UserProfile from './components/user/UserProfile';
import Wishlist from './components/wishlist/Wishlist';
import WishlistPage from './components/wishlist/WishlistPage';
import Item from './components/item/Item';
import ItemPage from './components/item/ItemPage';

export const TOKEN_STORAGE_ID = "wishlist-token";

function App() {

  const [user, setUser] = useState([]);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  //check for token and user in storage
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        if (token) {
          WishlistApi.token = token;
          const decode = jwt.parseJWT(token);
          let currentUser = await WishlistApi.getUser(decode.username);
          setUser(currentUser);
        }
      } catch (err) {
        setUser(null);
      }
    }
    getCurrentUser();
  }, [token])


  //register function for new user
  async function register(data) {
    try {
      let token = await WishlistApi.registerNewUser(data);
      setToken(token);
      return true;
    } catch (errors) {
      return false;
    }
  }

  //login function for user
  async function login(data) {
    try {
      let token = await WishlistApi.createToken(data);
      setToken(token);
      return true;
    } catch (errors) {
      return false;
    }
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={providerUser}>
        {/* <NavSideBar setToken={setToken} setUser={setUser} /> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/test" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<Home />}/>} />
          <Route path="/register" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<AuthForm userFunction={register} formType="register" />}/>} />
          <Route path="/login" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<AuthForm userFunction={login} formType="login" />}/>} />
          <Route path="/profile/:username" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<UserProfile />}/>} />
          <Route path="/items" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<ItemPage />}/>} />
          <Route path="/wishlists" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<WishlistPage />} />} />
          <Route path="/wishlists/:username/:wishlistCategory/:wishlistTitle" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<Wishlist />}/>} />
          <Route path="/items/:itemId" 
              element={<NavSideBar setToken={setToken} setUser={setUser} box={<Item />}/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
