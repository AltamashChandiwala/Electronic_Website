import React, { useState, useEffect } from 'react';
import { database } from '../firebase'; // Import the database instance from firebase.js
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const WatchListPage = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const watchesRef = database.ref('watches');
    watchesRef.on('value', (snapshot) => {
      const watchesData = snapshot.val();
      if (watchesData) {
        const watchesArray = Object.values(watchesData);
        setWatches(watchesArray);
        setLoading(false);
      } else {
        console.log('No watches found in the database');
        setLoading(false);
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });

    return () => watchesRef.off('value');
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Electronic Watches</h2>
        <div className="row">
          {watches.map(watch => (
            <div key={watch.product_id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={watch.image} className="card-img-top" alt={watch.product_name} />
                <div className="card-body">
                  <h5 className="card-title">{watch.product_name}</h5>
                  <p className="card-text"><strong>New Price:</strong> ${watch.new_price}</p>
                  <p className="card-text"><strong>Old Price:</strong> ${watch.old_price}</p>
                  <p className="card-text"><strong>Discount:</strong> {watch.discount}%</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0"><strong>Stars:</strong> {watch.stars}</p>
                    <Link to={`/watch/${watch.product_id}`} className="btn btn-primary">View Details</Link>
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

export default WatchListPage;
