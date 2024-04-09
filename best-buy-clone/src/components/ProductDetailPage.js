import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { database, auth } from '../firebase'; // Import Realtime Database from firebase.js

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0); // Define activeSlide state
  const handleSlideChange = (selectedIndex) => setActiveSlide(selectedIndex); // Define handleSlideChange function
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    // Fetch user information from Firebase Authentication
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the user state if logged in
      } else {
        setUser(null); // Set user state to null if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription

  }, []);
  
  useEffect(() => {
    const getProductDetails = () => {
      const productRef = database.ref('mobiles/' + productId);
      productRef.once('value', (snapshot) => {
        const productData = snapshot.val();
        if (productData) {
          setProduct(productData);
        } else {
          console.log('No such product!');
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
    };

    getProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found!</div>;
  }
  const handleBuyNow = () => {
    // Check if user is logged in
    if (user) {
      // Save order information to the database
      const orderRef = database.ref('orders').push(); // Create a new unique key for the order
      orderRef.set({
        userEmail: user.email, // Use user's email
        productName: product.product_name, // Add the product name
        timestamp: new Date().toString(), // Add timestamp for order
      }).then(() => {
        console.log('Order saved successfully!');
        // Redirect to order success page or show confirmation message
        // For demonstration, let's navigate to the order success page
      }).catch((error) => {
        console.error('Error saving order:', error);
      });
    } else {
      console.error('User not logged in!');
      // Handles scenario where user is not logged in
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div id="productDetail">
          <div className="row">
            <div className="col-md-6">
              <div id="imageCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {product.desc_img.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === activeSlide ? 'active' : ''}`}>
                      <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <a className="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev" onClick={() => handleSlideChange((activeSlide - 1 + product.desc_img.length) % product.desc_img.length)}>
                  {/* <span className="carousel-control-prev-icon" aria-hidden="true" style={{ color: 'blue' }}></span> */}
                  <span className="sr-only" style={{ color: 'blue' }}>Previous</span>
                </a>
                <a className="carousel-control-next" href="#imageCarousel" role="button" data-slide="next" onClick={() => handleSlideChange((activeSlide + 1) % product.desc_img.length)} style={{ color: 'blue' }}>
                  {/* <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: 'blue' }}></span> */}
                  <span className="sr-only" style={{ color: 'blue' }}>Next</span>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <h2>{product.product_name}</h2>
              <p>Stars: {product.stars}</p>
              <p>New Price: ${product.new_price}</p>
              <p>Old Price: ${product.old_price}</p>
              <p>Discount: {product.discount}%</p>
              <p>Special Offer: {product.special_offer}</p>
              <p>Delivery Type: {product.delivery_type}</p>
              <h3>Description:</h3>
              <p>{product.desc_1}</p>
              <p>{product.desc_2}</p>
              <p>{product.desc_3}</p>
              <p>{product.desc_4}</p>
              <Link to="/ordersuccess" className="btn btn-primary" onClick={handleBuyNow}>Buy Now</Link>
            </div>
          </div>
        </div>

        <div id="imageSlider" className="mt-4">
          {product.image_gallery.map((image, index) => (
            <img key={index} src={image} className="img-fluid" alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
