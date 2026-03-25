import React from 'react';
import { useCart } from '../Addcart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useCart(); // access cart functions
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty 🛒</h3>
        <button className='btn btn-primary mt-3' onClick={() => navigate('/')}>
          Back to Shop
        </button>
      </div>
    );
  }

  const updateQuantity = (id, delta) => {
    cart.forEach(item => {
      if(item.id === id){
        const newQty = Math.max(1, item.quantity + delta);
        item.quantity = newQty;
      }
    });
    // Force re-render by updating state
    addToCart({}); // dummy call, consider using setCart in provider if needed
  };

  const totalCost = cart.reduce((acc, item) => acc + item.product_cost * item.quantity, 0);

  return (
    <div className="container py-5">
      <h3>Your Cart 🛒</h3>
      <table className="table table-hover mt-4 align-middle">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td className="d-flex align-items-center">
                <img
                  src={"https://kivuti.alwaysdata.net/static/images/" + item.product_photo}
                  alt={item.product_name}
                  style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px" }}
                />
                {item.product_name}
              </td>
              <td>Kes {item.product_cost}</td>
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => updateQuantity(item.id, -1)}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-1"
                    onClick={() => updateQuantity(item.id, 1)}
                  >+</button>
                </div>
              </td>
              <td>Kes {item.product_cost * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="mt-3">Total: Kes {totalCost}</h4>
      <button
        className="btn btn-success mt-2"
        onClick={() => navigate('/makepayment', { state: { cart } })}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;