import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">Corteiz Thrifters</h4>
            <p>
              Built for style, identity, and originality. 
              Wear confidence every day.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><Link to="/aboutus" className="text-light text-decoration-none">About Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">z
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-light me-3">Instagram</a>
              <a href="#" className="text-light me-3">Twitter</a>
              <a href="#" className="text-light">TikTok</a>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        <div className="text-center">
          <p className="mb-0">
            © 2026 Corteiz thrifters. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer