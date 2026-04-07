import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa'; // ✅ Cart icon
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Aboutus from './components/Aboutus';
import Cart from './components/Cart';
import logo from './assets/sacredlogo.png'; // ✅ Logo file
import { CartProvider, useCart } from './Addcart'; // ✅ CartProvider & useCart

// ✅ Cart Icon Component
const CartIcon = () => {
  const { cart } = useCart();
  return (
    <Link to="/cart" className="nav-link position-relative">
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
  return (
    <Router>
      {/* ✅ Wrap entire app in CartProvider */}
      <CartProvider>
         {/* ✅ Navigation Bar with Logo */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-4">
          <div className="container d-flex align-items-center justify-content-between">
            {/* Logo + Brand */}
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img 
                src={logo} 
                alt="MyShop Logo" 
                style={{ height: '40px', marginRight: '10px' }} 
              />
              Home
            </Link>

            {/* Nav Links */}
            <div className="navbar-nav d-flex align-items-center">
              <Link to="/addproducts" className="nav-link">Add Products</Link>
              <Link to="/aboutus" className="nav-link">About us</Link> 
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
              {/* ✅ Live Cart Icon */}
              <CartIcon />
            </div>
          </div>
        </nav>
        
        <div className="App">
          <header className='App-header'>
            <h2>Welcome to Sacred Vanity Online Shop</h2>
          </header>
          <Routes>
            <Route path='/signup' element={<Signup/>} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/addproducts' element={<Addproducts />} />
            <Route path='/' element={<Getproducts />} />
            <Route path='/makepayment' element={<Makepayment/>} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Notfound/>} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;