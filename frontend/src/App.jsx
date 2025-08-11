import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Analytics from './pages/Analytics/Analytics.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  )
}

export default App