import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-footer text-dark text-center py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@bestbuy.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Connect with Us</h5>
            <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <img src="path/to/your/logo.png" alt="Best Buy Logo" className="img-fluid"/>
          </div>
        </div>
      </div>
      <p>&copy; 2024 Best Buy. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
