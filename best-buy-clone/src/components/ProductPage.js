// ProductPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/AltamashChandiwala/Mobile_data/main/mobile.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Mobile Products</h2>
        <div className="row">
          {products.map(products => (
            <div key={products.product_id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={products.image} className="card-img-top" alt={products.product_name} />
                <div className="card-body">
                  <h5 className="card-title">{products.product_name}</h5>
                  <p className="card-text"><strong>New Price:</strong> ${products.new_price}</p>
                  <p className="card-text"><strong>Old Price:</strong> ${products.old_price}</p>
                  <p className="card-text"><strong>Discount:</strong> {products.discount}%</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0"><strong>Stars:</strong> {products.stars}</p>
                    <Link to={`/product/${products.product_id}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default ProductPage;
