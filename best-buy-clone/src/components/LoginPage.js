import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic (authentication, API calls, etc.) here
    console.log('Login clicked');
  };

  return (
    <div>
        <Navbar/>
        <div className="container mt-4">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control small-input" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control small-input" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
            <p className="mt-3">
                Don't have an account? <Link to="/signup">Sign up here</Link>.
            </p>
        </div>
        <Footer/>
    </div>
  );
};

export default LoginPage;
