import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail';
import UserFavorites from './pages/UserFavorites';
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NavBar from './layouts/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:movieId" element={<MovieDetail />} />
        <Route path="/user/favorites" element={<UserFavorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
