// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import the default styles
import HomeContent from './components/HomeContent';
import ProductDetailPage from './components/ProductDetailPage';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/product/:productId" element={<ProductDetailPage/>} />
        <Route path="/products" element={<ProductPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
