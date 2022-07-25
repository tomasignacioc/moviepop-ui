import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing'
import Home from './pages/Home'
import NavBar from './layouts/NavBar';
import MovieDetail from './pages/MovieDetail';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:movieId" element={<MovieDetail />} />
        {/* <Route element={<NavBar />}>
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
