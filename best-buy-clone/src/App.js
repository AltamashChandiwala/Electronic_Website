// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import the default styles
import HomeContent from './components/HomeContent';
import ProductDetailPage from './components/ProductDetailPage';
import ProductPage from './components/ProductPage';
import OrderSuccess from './components/OrderSuccess';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import WatchListPage from './components/WatchListPage';
import WatchDetailPage from './components/WatchDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/product/:productId" element={<ProductDetailPage/>} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/ordersuccess" element={<OrderSuccess/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/watch" element={<WatchListPage/>}/>
        <Route path="/watch/:watchId" element={<WatchDetailPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
