import React, {useEffect, useState, useMemo} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//backend, helpers, & hooks
import WishlistApi from './helpers/WishlistAPI';
import jwt from "webcrypto-jwt";
import UserContext from './helpers/UserContext';
import useLocalStorage from './hooks/useLocalStoage';

//components
import NavBar from './components/NavBar';
import Home from './components/Home'
import AuthForm from './components/AuthForm';
import Loading from './components/Loading';
import UserProfile from './components/UserProfile';

export const TOKEN_STORAGE_ID = "wishlist-token";

function App() {

  const [user, setUser] = useState([]);
  const providerUser = useMemo(()=> ({user, setUser}), [user, setUser]);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(false);


  //check for token and user in storage
  useEffect(() => {
    const getCurrentUser = async() => {
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
      // setIsLoading(true);
    }
    setIsLoading(false);
    getCurrentUser();
  },[token])


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
  
  //show loading symbol while information is loading
  if(isLoading) return <Loading />

  return (
    <BrowserRouter>
      <UserContext.Provider value={providerUser}>
          <NavBar setToken={setToken} setUser={setUser} />
          <Routes>

            <Route path="/" element={<Home  />} />
            <Route path="/register" element={<AuthForm userFunction={register} formType="register" />} />
            <Route path="/login" element={<AuthForm userFunction={login} formType="login" />} />
            <Route path="/profile" element={<UserProfile />} />

          </Routes>
        </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
