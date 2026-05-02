import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import axios from "axios";

const Footer = () => {

  // =========================
  // SUBSCRIBE STATE
  // =========================
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // SUBSCRIBE FUNCTION
  // =========================
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);

      const response = await axios.post(
        "https://kivuti.alwaysdata.net/api/prompt",
        formdata
      );

      setMessage(response.data.message);
      setEmail("");

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Subscription failed"
      );
    }

    setLoading(false);
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">Sacred Vanity</h4>
            <p>
              Built for style, identity, and originality. 
              Wear confidence every day.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><Link to="/aboutus" className="text-light text-decoration-none">About Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex align-items-center gap-3">

              <a href="https://instagram.com/ys.vuti" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaInstagram />
              </a>

              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaTwitter />
              </a>

              <a href="https://tiktok.com/@ys.vuti" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaTiktok />
              </a>

            </div>
          </div>

          {/* =========================
              SMALL SUBSCRIBE BOX
          ========================= */}
          <div className="col-md-3 mb-4">
            <h5>Subscribe</h5>

            <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">

              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className="btn btn-outline-light btn-sm"
                disabled={loading}
              >
                {loading ? "..." : "Join"}
              </button>

            </form>

            {message && (
              <small className="d-block mt-2 text-info">
                {message}
              </small>
            )}

          </div>

        </div>

        <hr className="bg-light" />

        <div className="text-center">
          <p className="mb-0">
            © 2026 Sacred Vanity. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;