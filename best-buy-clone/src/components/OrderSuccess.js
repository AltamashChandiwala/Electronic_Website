// src/components/OrderSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const OrderSuccess = () => {
  return (
    <div>
        <Navbar/>
        <div className="container mt-4 text-center">
        <img src="/images/success.png" className="img-fluid mb-4" alt="Order Success" style={{ maxWidth: '35%', height: 'auto' }} />
            <h2 className="font-weight-bold">Order Placed Successfully!</h2>
            <Link to="/" className="btn btn-primary mt-3">Go Back to Homepage</Link>
        </div>
        <Footer/>
    </div>
  );
};

export default OrderSuccess;
