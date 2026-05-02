import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import Footer from './Footer';

const Addproducts = () => {

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();

      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post(
        "https://kivuti.alwaysdata.net/api/add_product",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      e.target.reset();

      setTimeout(() => setSuccess(""), 4000);

    } catch (error) {
      setLoading(false);
      setError("UPLOAD FAILED");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        color: "#000"
      }}
    >

      <div className="row justify-content-center mt-4">

        {/* 🧱 CARD */}
        <div
          className="col-md-6 p-4 card shadow"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #eee",
            borderRadius: "0px",
            color: "#000",
            maxWidth: "520px"
          }}
        >

          {/* BRAND HEADER */}
          <h3
            style={{
              textAlign: "center",
              letterSpacing: "3px",
              fontWeight: "900"
            }}
          >
            SACRED VANITY
          </h3>

          <p
            style={{
              textAlign: "center",
              color: "#B8860B",
              letterSpacing: "2px",
              fontSize: "12px",
              marginBottom: "20px"
            }}
          >
            PRODUCT UPLOAD SYSTEM
          </p>

          <h4
            style={{
              textAlign: "center",
              marginBottom: "20px",
              letterSpacing: "2px"
            }}
          >
            WELCOME TO SACRED VANITY
          </h4>

          {/* STATUS */}
          {loading && <Loader />}
          {success && <h5 className="text-success text-center">{success}</h5>}
          {error && <h5 className="text-danger text-center">{error}</h5>}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="ITEM NAME"
              className="form-control mb-3"
              required
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />

            <input
              type="text"
              placeholder="ITEM DESCRIPTION"
              className="form-control mb-3"
              required
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="PRICE (KES)"
              className="form-control mb-3"
              required
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}
            />

            <label style={{ color: "#B8860B", fontSize: "12px" }}>
              PRODUCT IMAGE
            </label>

            <input
              type="file"
              className="form-control mb-3"
              required
              accept="image/*"
              onChange={(e) => setProductPhoto(e.target.files[0])}
            />

            <input
              type="submit"
              value="UPLOAD DROP"
              className="btn w-100"
              style={{
                backgroundColor: "#B8860B",
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: "3px"
              }}
            />

          </form>

        </div>
      </div>

      {/* 🤍 GLOBAL INPUT STYLE FIX */}
      <style>
        {`
          input::placeholder {
            color: #999 !important;
            letter-spacing: 2px;
          }

          input {
            background: transparent !important;
            border: 1px solid #ddd !important;
            color: #000 !important;
            text-align: center;
            letter-spacing: 2px;
          }

          input:focus {
            outline: none !important;
            border-color: #B8860B !important;
            box-shadow: none !important;
          }
        `}
      </style>

      <Footer />
    </div>
  );
};

export default Addproducts;