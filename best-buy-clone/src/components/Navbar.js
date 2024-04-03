import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authorized (logged in)
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Check if the user's email is verified (if required)
        if (!user.emailVerified) {
          console.log('Email not verified');
          setIsLoggedIn(false);
          navigate('/login'); // Redirect to login page if email is not verified
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
      <Link className="navbar-brand" to="/">Best Buy</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Mobile Listing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watch">Watch Listing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/myaccount">My Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crud">Add Products</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );

}

export default Navbar;
