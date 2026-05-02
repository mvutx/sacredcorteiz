import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Aboutus from './components/Aboutus';
import Cart from './components/Cart';
import PasswordGate from './components/PasswordGate';

import logo from './assets/sacredlogo.png';
import { CartProvider, useCart } from './Addcart';

// 🛒 Cart Icon
const CartIcon = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart" className="nav-link position-relative text-warning">
      <FaShoppingCart size={20} />
      {cart.length > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart.length}
        </span>
      )}
    </Link>
  );
};

function App() {

  // 🔐 ALWAYS LOCKED ON START (NO AUTO LOGIN)
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <Router>
      <CartProvider>

        {/* 🔐 PASSWORD GATE ALWAYS FIRST */}
        {!unlocked ? (
          <PasswordGate onUnlock={handleUnlock} />
        ) : (
          <>
            {/* 🧭 NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow mb-4">
              <div className="container d-flex align-items-center justify-content-between">

                <Link to="/" className="navbar-brand d-flex align-items-center text-warning">
                  <img
                    src={logo}
                    alt="Sacred Vanity Logo"
                    style={{ height: '40px', marginRight: '10px' }}
                  />
                  SACRED VANITY
                </Link>

                <div className="navbar-nav d-flex align-items-center">

                  {/* ✅ HOME FIXED (GetProducts is home) */}
                  <Link to="/" className="nav-link text-warning fw-bold">
                    Home
                  </Link>

                  <Link to="/addproducts" className="nav-link text-warning">
                    Add Products
                  </Link>

                  <Link to="/aboutus" className="nav-link text-warning">
                    About
                  </Link>

                  <Link to="/signup" className="nav-link text-warning">
                    Sign Up
                  </Link>

                  <Link to="/signin" className="nav-link text-warning">
                    Sign In
                  </Link>

                  <CartIcon />
                </div>

              </div>
            </nav>

            {/* 🟡 HEADER */}
            <div
              style={{
                backgroundColor: "#FFD700",
                textAlign: "center",
                padding: "10px 0",
                marginBottom: "20px"
              }}
            >
              <h2
                style={{
                  color: "#000",
                  letterSpacing: "2px",
                  fontWeight: "900",
                  margin: 0
                }}
              >
                SACRED VANITY
              </h2>
            </div>

            {/* 🧱 ROUTES */}
            <div className="App">
              <Routes>
                <Route path='/' element={<Getproducts />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/addproducts' element={<Addproducts />} />
                <Route path='/makepayment' element={<Makepayment />} />
                <Route path='/aboutus' element={<Aboutus />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='*' element={<Notfound />} />
              </Routes>
            </div>
          </>
        )}

      </CartProvider>
    </Router>
  );
}

export default App;