import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { database } from '../firebase'; // Import Realtime Database from firebase.js

const WatchDetailPage = () => {
  const { watchId } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0); // Define activeSlide state
  const handleSlideChange = (selectedIndex) => setActiveSlide(selectedIndex); // Define handleSlideChange function

  useEffect(() => {
    const getWatchDetails = () => {
      const watchRef = database.ref('watches/' + watchId);
      watchRef.once('value', (snapshot) => {
        const watchData = snapshot.val();
        if (watchData) {
          setWatch(watchData);
        } else {
          console.log('No such watch!');
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching watch details:', error);
        setLoading(false);
      });
    };

    getWatchDetails();
  }, [watchId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!watch) {
    return <div>No watch found!</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div id="watchDetail">
          <div className="row">
            <div className="col-md-6">
              <div id="imageCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {watch.desc_img.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === activeSlide ? 'active' : ''}`}>
                      <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <a className="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev" onClick={() => handleSlideChange((activeSlide - 1 + watch.desc_img.length) % watch.desc_img.length)}>
                  <span className="sr-only" style={{ color: 'blue' }}>Previous</span>
                </a>
                <a className="carousel-control-next" href="#imageCarousel" role="button" data-slide="next" onClick={() => handleSlideChange((activeSlide + 1) % watch.desc_img.length)} style={{ color: 'blue' }}>
                  <span className="sr-only" style={{ color: 'blue' }}>Next</span>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <h2>{watch.product_name}</h2>
              <p>Stars: {watch.stars}</p>
              <p>New Price: ${watch.new_price}</p>
              <p>Old Price: ${watch.old_price}</p>
              <p>Discount: {watch.discount}%</p>
              <p>Special Offer: {watch.special_offer}</p>
              <p>Delivery Type: {watch.delivery_type}</p>
              <h3>Description:</h3>
              <p>{watch.desc_1}</p>
              <p>{watch.desc_2}</p>
              <p>{watch.desc_3}</p>
              <p>{watch.desc_4}</p>
              <Link to="/ordersuccess" className="btn btn-primary">Buy Now</Link>
            </div>
          </div>
        </div>

        <div id="imageSlider" className="mt-4">
          {watch.image_gallery.map((image, index) => (
            <img key={index} src={image} className="img-fluid" alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WatchDetailPage;
