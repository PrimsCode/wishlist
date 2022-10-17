import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useTheme} from '@mui/material';
// import './App.css';

//backend
import WishlistApi from './helpers/WishlistAPI';
import jwt from "webcrypto-jwt";
// import jwt from "jsonwebtoken";
// import jwt_decode from "jwt-decode";

//components
// import NavBar from './components/NavBar';
import Home from './components/Home'
import AuthForm from './components/AuthForm';
// import Profile from './components/Profile';
// import CompanyList from './components/CompanyList'
// import JobList from './components/JobList';
// import CompanyDetail from './components/CompanyDetail';
// import SignUpForm from './components/SignUpForm';
// import LoginForm from './components/LoginForm';

function App() {

  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async (newToken) => {
    try{
      console.log("get current user");
      WishlistApi.token = newToken;
      const decode = jwt.decodeJWT(newToken);    
      let currentUser = await WishlistApi.getUser(decode.username);
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (err) {
      setUser(null);
    }
  }
  
  useEffect(() => {
    const checkUserLogin = () => {
      if(localStorage){
        setToken(localStorage.getItem("token"));
        setUser(JSON.parse(localStorage.getItem("user")));
        console.log(token);
        console.log(user);
      }
      return;
    }
    checkUserLogin();
  },[])

  return (
    <BrowserRouter>
        {/* <NavBar token={token} user={user} setToken={setToken} setUser={setUser} /> */}
        <Routes>

          <Route path="/" element={<Home  />} />
          <Route path="/register" element={<AuthForm setToken={setToken} user={user} getCurrentUser={getCurrentUser}/>} />
          {/* <Route path="/signup" element={<SignUpForm setToken={setToken} user={user} getCurrentUser={getCurrentUser}/>} />
          <Route path="/login" element={<LoginForm setToken={setToken} user={user} getCurrentUser={getCurrentUser} setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
