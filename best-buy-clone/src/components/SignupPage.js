// src/components/SignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');


  const handleSignup = () => {
    // Handle signup logic (create account, API calls, etc.) here
    console.log('Signup clicked');
  };

  return (
    <div>
        <Navbar/>
        <div className="container mt-4">
            <h2>Sign Up</h2>
            <form>
                <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control" id="username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input type="confirmpassword" className="form-control" id="confirmpassword" placeholder="Re-enter password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
            </form>
            <p className="mt-3">
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
        <Footer/>
    </div>
  );
};

export default SignupPage;
