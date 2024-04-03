import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleShopNow = () => {
    if (isLoggedIn) {
      // Redirect to products page if logged in
      navigate('/products');
    } else {
      // Redirect to login page if not logged in
      navigate('/login');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img src="/images/image1.png" className="img-fluid" alt="Big Image" />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12 mb-4">
              <img src="/images/image2.png" className="img-fluid" alt="Top Image" />
            </div>
            <div className="col-md-6 mb-4">
              <img src="/images/image3.png" className="img-fluid" alt="Image 1" />
            </div>
            <div className="col-md-6 mb-4">
              <img src="/images/image4.png" className="img-fluid" alt="Image 2" />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <img src="/images/image5.png" className="img-fluid" alt="Image 5" />
        </div>
      </div>
      <div className="row mt-4 justify-content-center"> 
        <div className="col-md-12 text-center">
          <h1>Shop by Category</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <img src="/images/mobile.png" className="card-img-top" alt="Mobiles" />
            <div className="card-body">
              <h5 className="card-title">Mobiles</h5>
              {isLoggedIn ? (
                <Link to="/products" className="btn btn-primary">Shop Now</Link>
              ) : (
                <button className="btn btn-primary" onClick={handleShopNow}>Shop Now</button>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <img src="/images/watch.jpeg" className="card-img-top" alt="Watches" />
            <div className="card-body">
              <h5 className="card-title">Watches</h5>
              {isLoggedIn ? (
                <Link to="/watch" className="btn btn-primary">Shop Now</Link>
              ) : (
                <button className="btn btn-primary" onClick={handleShopNow}>Shop Now</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <img src="/images/image6.png" className="img-fluid" alt="Image 5" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
