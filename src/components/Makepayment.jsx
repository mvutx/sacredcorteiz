import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Footer from "./Footer";

const Makepayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialProducts = location.state?.product
    ? [{ ...location.state.product, quantity: 1 }]
    : location.state?.cart?.map(item => ({
        ...item,
        quantity: item.quantity || 1
      })) || [];

  const [products, setProducts] = useState(initialProducts);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const img_url = "https://kivuti.alwaysdata.net/static/images/";

  // =========================
  // FORMAT PHONE NUMBER
  // =========================
  const formatPhoneNumber = (phone) => {
    let formatted = phone.trim();

    if (formatted.startsWith("07")) {
      formatted = "254" + formatted.slice(1);
    }

    if (formatted.startsWith("+254")) {
      formatted = formatted.slice(1);
    }

    return formatted;
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = (id, delta) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  // =========================
  // TOTAL
  // =========================
  const totalCost = products.reduce(
    (acc, item) => acc + item.product_cost * (item.quantity || 1),
    0
  );

  const finalTotal = totalCost;

  // =========================
  // PAYMENT
  // =========================
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Validate number
    if (!/^(\+?254|0)7\d{8}$/.test(number)) {
      setError("Enter a valid Safaricom number (07XXXXXXXX or 254XXXXXXXXX)");
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(number);

      const formdata = new FormData();
      formdata.append("phone", formattedPhone);
      formdata.append("amount", finalTotal);

      const response = await axios.post(
        "https://kivuti.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setSuccess(response.data.message || "Payment initiated");
    } catch (err) {
      setError(err.message || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h1 className="text-success mb-4">
        Make Payment - Lipa na M-Pesa
      </h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button>

      <div className="card shadow p-4">

        {/* PRODUCTS */}
        {products.map((item) => (
          <div key={item.id} className="d-flex align-items-center mb-3">
            <img
              src={img_url + item.product_photo}
              alt=""
              style={{
                height: 60,
                width: 60,
                objectFit: "cover",
                marginRight: 10
              }}
            />

            <div className="flex-grow-1">
              <strong>{item.product_name}</strong>
              <div className="text-muted">
                Kes {item.product_cost} × {item.quantity}
              </div>
            </div>

            <div>
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>

              <span className="mx-2">{item.quantity}</span>

              <button
                className="btn btn-sm btn-outline-dark"
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}

        <hr />

        {/* TOTALS */}
        <h5>Total: Kes {totalCost}</h5>
        <h4 className="text-success">
          Final: Kes {finalTotal}
        </h4>

        <hr />

        {/* PAYMENT */}
        {success ? (
          <div className="text-center py-4">
            <div style={{ fontSize: "60px", color: "green" }}>✔</div>
            <h4>Payment Successful</h4>
            <p>{success}</p>

            <button
              className="btn btn-dark"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handlesubmit}>
            {loading && <Loader />}
            {error && <p className="text-danger">{error}</p>}

            <input
              className="form-control mb-3"
              placeholder="07XXXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />

            <button className="btn btn-dark w-100" disabled={loading}>
              {loading ? "Processing..." : `Pay Kes ${finalTotal}`}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Makepayment;