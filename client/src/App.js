import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//backend, helpers, & hooks
import WishlistApi from './helpers/WishlistAPI';
import jwt from "webcrypto-jwt";
import UserContext from './helpers/UserContext';
import useLocalStorage from './hooks/useLocalStoage';

//components
import NavSideBar from './components/navbar/NavSideBar';
import Landing from './components/Landing';
import AuthForm from './components/form/AuthForm';
import UserProfile from './components/user/UserProfile';
import Wishlist from './components/wishlist/Wishlist';
import WishlistPage from './components/wishlist/WishlistPage';
import Item from './components/item/Item';
import ItemPage from './components/item/ItemPage';
import ItemCategoryPage from './components/item/ItemCategoryPage';
import EditUser from './components/form/EditUser';

export const TOKEN_STORAGE_ID = "wishlist-token";

function App() {

  const [user, setUser] = useState([]);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  //check for token and user in storage
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
  
  useEffect(() => {
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

    //edit function for user
    async function edit(username, data) {
      try {
        await WishlistApi.updateUser(username, data);
        console.log(data);
        getCurrentUser();
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
          <Route path="/register"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<AuthForm userFunction={register} formType="register" />} />} />
          <Route path="/login"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<AuthForm userFunction={login} formType="login" />} />} />
          <Route path="/profile/:username"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<UserProfile />} />} />
          <Route path="/profile/:username/edit"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<EditUser userFunction={edit} />} />} />
          <Route path="/items"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<ItemPage />} />} />
          <Route path="/wishlists"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<WishlistPage />} />} />
          <Route path="/wishlists/:username/:wishlistCategory/:wishlistTitle"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<Wishlist />} />} />
          <Route path="/items/:itemId"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<Item />} />} />
          <Route path="/items/categories/:category"
            element={<NavSideBar setToken={setToken} setUser={setUser} box={<ItemCategoryPage />} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
