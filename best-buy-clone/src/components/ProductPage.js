import React, { useState, useEffect } from 'react';
import { database } from '../firebase'; // Import the database instance from firebase.js
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = database.ref('mobiles');
    productsRef.on('value', (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray = Object.values(productsData);
        setProducts(productsArray);
        setLoading(false);
      } else {
        console.log('No products found in the database');
        setLoading(false);
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });

    return () => productsRef.off('value');
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Mobile Products</h2>
        <div className="row">
          {products.map(product => (
            <div key={product.product_id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.product_name} />
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text"><strong>New Price:</strong> ${product.new_price}</p>
                  <p className="card-text"><strong>Old Price:</strong> ${product.old_price}</p>
                  <p className="card-text"><strong>Discount:</strong> {product.discount}%</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0"><strong>Stars:</strong> {product.stars}</p>
                    <Link to={`/product/${product.product_id}`} className="btn btn-primary">View Details</Link>
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
};

export default ProductPage;
