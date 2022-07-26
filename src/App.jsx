import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail';
import UserFavorites from './pages/UserFavorites';
import LogInSignUp from './pages/LogInSignUp';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:movieId" element={<MovieDetail />} />
      <Route path="/user/favorites" element={<UserFavorites />} />
      <Route path="/login" element={<LogInSignUp />} />
    </Routes>
  );
}

export default App;
