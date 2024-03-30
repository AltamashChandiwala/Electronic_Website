import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Privacy Policy</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <p className="card-text text-justify">At Tech Store, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the data you provide to us.</p>
                <h4>Information We Collect</h4>
                <p className="card-text text-justify">We may collect various types of information, including:</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Personal Information: Such as your name, email address, and contact details provided during account registration or checkout.</li>
                  <li className="list-group-item">Device Information: Such as your IP address, browser type, and operating system, collected automatically when you visit our website.</li>
                  <li className="list-group-item">Usage Data: Such as your interactions with our website, including pages visited, products viewed, and shopping preferences.</li>
                </ul>
                <h4>How We Use Your Information</h4>
                <p className="card-text text-justify">We use the collected information for various purposes, including:</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">To process and fulfill your orders.</li>
                  <li className="list-group-item">To personalize your shopping experience and provide relevant product recommendations.</li>
                  <li className="list-group-item">To communicate with you regarding your orders, promotions, and updates.</li>
                  <li className="list-group-item">To improve our website's functionality, content, and security.</li>
                </ul>
                <h4>Data Security</h4>
                <p className="card-text text-justify">We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.</p>
                <h4>Third-Party Services</h4>
                <p className="card-text text-justify">We may use third-party services (such as payment processors) to facilitate transactions and provide certain functionalities. These services have their privacy policies, and we recommend reviewing them for further information.</p>
                <h4>Updates to Privacy Policy</h4>
                <p className="card-text text-justify">We may update our Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this policy regularly for any updates.</p>
                <p className="card-text text-justify">By using our website and services, you agree to the terms outlined in this Privacy Policy. If you have any questions or concerns about your privacy or data protection, please contact us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
