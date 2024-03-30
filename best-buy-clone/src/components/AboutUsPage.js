import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <p className="card-text text-center">Welcome to Tech Store, your one-stop destination for the latest smartphones and smartwatches!</p>
                <p className="card-text">At Tech Store, we are passionate about technology and innovation. Our mission is to provide our customers with high-quality electronic devices that enhance their digital lifestyle.</p>
                <hr />
                <h4>Why Choose Tech Store?</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Wide Range of Products: We offer a diverse selection of smartphones and smartwatches from leading brands.</li>
                  <li className="list-group-item">Quality Assurance: All our products undergo rigorous testing to ensure top-notch quality and performance.</li>
                  <li className="list-group-item">Competitive Prices: We strive to offer competitive prices to make cutting-edge technology accessible to everyone.</li>
                  <li className="list-group-item">Excellent Customer Service: Our dedicated team is here to assist you with any queries or concerns.</li>
                </ul>
                <hr />
                <p className="card-text">Whether you're looking for the latest iPhone or a stylish smartwatch, Tech Store has got you covered. Explore our collection and experience the future of technology today!</p>
                <p className="card-text">Thank you for choosing Tech Store.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
