import React from 'react';

const Footer = () => {
  return (
    <footer class="bg-footer text-dark text-center py-3">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h5>Quick Links</h5>
                <ul class="list-unstyled">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms and Conditions</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h5>Contact Us</h5>
                <p>Email: info@bestbuy.com</p>
                <p>Phone: 123-456-7890</p>
            </div>
            <div class="col-md-4">
                <h5>Connect with Us</h5>
                <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <img src="path/to/your/logo.png" alt="Best Buy Logo" class="img-fluid"/>
            </div>
        </div>
    </div>
    <p>&copy; 2024 Best Buy. All rights reserved.</p>
</footer>
  );
}

export default Footer;