import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore, storage } from '../firebase.js'; // Import auth and firestore from firebase.js
import Navbar from './Navbar';
import Footer from './Footer';
import defaultProfileImage from '../assets/default.png'; // Import default profile image

const MyAccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const uid = authUser.uid;
        const userRef = firestore.collection('users').doc(uid);

        userRef.get().then((doc) => {
          if (doc.exists) {
            setUser(doc.data());
          } else {
            console.log('No such document!');
          }
          setLoading(false);
        }).catch((error) => {
          console.error('Error getting document:', error.message); // Log Firestore error
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <h2>My Account</h2>
          <p>Please <Link to="/login">login</Link> to view your account details.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">My Account</h2>
        <div className="text-center mb-4">
          <img
            src={user.profileImage || defaultProfileImage}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>
        <form className="mb-4">
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control-plaintext"
                id="username"
                value={user.username}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control-plaintext"
                id="email"
                value={user.email}
                readOnly
              />
            </div>
          </div>
          {/* Add more form fields for additional user details */}
        </form>
        <p className="text-center">
          <Link to="/">Go back to homepage</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccountPage;
