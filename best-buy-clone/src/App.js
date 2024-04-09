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
import AboutUsPage from './components/AboutUsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import ProductCRUD from './components/ProductCRUD';
import { auth } from './firebase'; // Import auth from firebase.js

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn based on user authentication status
      setIsAdmin(!!user && user.email === 'altamashchandiwala@gmail.com'); // Check if the user is an admin
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/policy" element={<PrivacyPolicyPage/>} />
        <Route path="/terms" element={<TermsAndConditionsPage/>} />
        {isLoggedIn ? (
          <>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/watch" element={<WatchListPage />} />
            <Route path="/watch/:watchId" element={<WatchDetailPage />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
            {/* <Route path="/crud" element={<ProductCRUD />} /> */}
            {isAdmin && <Route path="/crud" element={<ProductCRUD />} />} {/* Conditionally render CRUD routes */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
