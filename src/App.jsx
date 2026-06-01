import React, { useEffect, useState } from 'react';
import "./style/index.scss"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/index';
import Genre from './pages/genre';
import Movie from './pages/movie';
import Browse from './pages/browse';

const App = () => {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< Home/>}></Route>
        <Route path="/genre/:id" element={< Genre/>}></Route>
        <Route path="/movie/:id" element={< Movie/>}></Route>
        <Route path="/browse" element={< Browse/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;