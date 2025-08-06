import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App