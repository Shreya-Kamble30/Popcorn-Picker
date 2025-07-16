import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MovieSearch from './Components/MovieSearch';
import Favorite from './Components/Favorite';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/Favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
};

export default App;
