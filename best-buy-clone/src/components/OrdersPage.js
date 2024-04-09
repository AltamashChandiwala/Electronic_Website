import React, { useEffect, useState } from 'react';
import { database } from '../firebase'; // Import Realtime Database from firebase.js
import Navbar from './Navbar';
import Footer from './Footer';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = () => {
      const ordersRef = database.ref('orders');
      ordersRef.on('value', (snapshot) => {
        const ordersData = snapshot.val();
        if (ordersData) {
          const ordersList = Object.keys(ordersData).map((key) => ({
            id: key,
            ...ordersData[key],
          }));
          setOrders(ordersList);
          setLoading(false);
        } else {
          setOrders([]);
          setLoading(false);
        }
      });
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar/>
    <div className="container mt-4">
      <h2>Orders</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>User Email</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.userEmail}</td>
              <td>{order.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
};

export default OrdersPage;
