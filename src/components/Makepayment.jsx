import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Footer from './Footer';

const Makepayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle single product or cart
  const initialProducts = location.state?.product
    ? [{ ...location.state.product, quantity: 1 }] // single product
    : location.state?.cart?.map(item => ({ ...item, quantity: 1 })) || []; // cart

  const [products, setProducts] = useState(initialProducts);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const img_url = "https://kivuti.alwaysdata.net/static/images/";

  if (products.length === 0) {
    return (
      <div className='container py-5 text-center'>
        <h3>Your cart is empty 🛒</h3>
        <button className='btn btn-primary mt-3' onClick={() => navigate('/')}>
          Back to Shop
        </button>
      </div>
    );
  }

  // Function to increase or decrease quantity
  const updateQuantity = (id, delta) => {
    setProducts(prev =>
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
          : item
      )
    );
  };

  const totalCost = products.reduce(
    (acc, item) => acc + item.product_cost * item.quantity,
    0
  );

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", totalCost);

      const response = await axios.post(
        "https://kivuti.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className='container py-4'>
      <h1 className="text-success mb-4">Make Payment - Lipa na M-Pesa</h1>

      <button
        className='btn btn-primary mb-3'
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button>

      {/* ✅ Product list with quantity selector */}
      <div className="card shadow p-3 mb-3">
        {products.map((item) => (
          <div className="d-flex align-items-center mb-2" key={item.id}>
            <img
              src={img_url + item.product_photo}
              alt={item.product_name}
              style={{ height: "60px", width: "60px", objectFit: "cover", marginRight: "10px" }}
            />
            <div className="flex-grow-1">
              <strong>{item.product_name}</strong>
              <div className="text-warning">
                Kes {item.product_cost} × {item.quantity} = Kes {item.product_cost * item.quantity}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-secondary me-1"
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary ms-1"
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}

        <hr />
        <h5>Total: Kes {totalCost}</h5>
      </div>

      {/* ✅ Payment form */}
      <form onSubmit={handlesubmit} className="card shadow p-3">
        {loading && <Loader />}
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <input
          type="number"
          className='form-control mb-3'
          placeholder='Enter Phone number 254XXXXXXX'
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <input
          type="submit"
          value="Make Payment"
          className='btn btn-success w-100'
        />
      </form>

      <Footer />
    </div>
  );
};

export default Makepayment;