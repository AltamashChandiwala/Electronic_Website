import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, storage } from '../firebase.js'; // Import auth, firestore, and storage from firebase.js
import Navbar from './Navbar';
import Footer from './Footer';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!username || !email || !password || !confirmpassword || !profileImage) {
      setError('All fields are required, including profile image');
      return;
    }

    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Signup successful:', userCredential.user);

      // Send email verification
      await userCredential.user.sendEmailVerification();

      // Additional signup logic (creating user profile in Firestore)
      const user = userCredential.user;
      await firestore.collection('users').doc(user.uid).set({
        username: username,
        email: email,
        // Add more user data fields as needed
      });

      // Upload profile image to Firebase Storage
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`profile-images/${user.uid}`);
      await imageRef.put(profileImage);

      // Redirect to login page after successful signup
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      setError(error.message); // Update error state with Firebase error message
      console.error('Error signing up:', error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              placeholder="Re-enter password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              className="form-control-file"
              id="profileImage"
              onChange={handleImageChange}
              accept="image/*" // Accept only image files
              required  // Make profile image field mandatory
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
