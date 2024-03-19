import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img src="/images/image1.png" className="img-fluid" alt="Big Image" />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12 mb-4">
              <img src="/images/image2.png" className="img-fluid" alt="Top Image" />
            </div>
            <div className="col-md-6 mb-4">
              <img src="/images/image3.png" className="img-fluid" alt="Image 1" />
            </div>
            <div className="col-md-6 mb-4">
              <img src="/images/image4.png" className="img-fluid" alt="Image 2" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <img src="/images/image5.png" className="img-fluid" alt="Image 5" />
        </div>
      </div>
      <div className="row mt-4 justify-content-center"> 
        <div className="col-md-12 text-center">
          <h1>Shop by Category</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <img src="/images/mobile.png" className="card-img-top" alt="Mobiles" />
            <div className="card-body">
              <h5 className="card-title">Mobiles</h5>
              <Link to="/products" className="btn btn-primary">Shop Now</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <img src="/images/watch.jpeg" className="card-img-top" alt="Watches" />
            <div className="card-body">
              <h5 className="card-title">Watches</h5>
              <Link to="/watch" className="btn btn-primary">Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <img src="/images/image6.png" className="img-fluid" alt="Image 5" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
