// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; // Import the default styles
import HomeContent from './components/HomeContent';
import ProductDetailPage from './components/ProductDetailPage';
import ProductPage from './components/ProductPage';
import OrderSuccess from './components/OrderSuccess';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import WatchListPage from './components/WatchListPage';
import WatchDetailPage from './components/WatchDetailPage';
import MyAccountPage from './components/MyAccountPage';
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer'; // Import Footer component
import { auth } from './firebase'; // Import auth from firebase.js

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn based on user authentication status
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {isLoggedIn ? (
          <>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/watch" element={<WatchListPage />} />
            <Route path="/watch/:watchId" element={<WatchDetailPage />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
