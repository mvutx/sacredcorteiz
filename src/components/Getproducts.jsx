import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Carousel from './Carousel';
import Prompt from './Prompt';
import { useCart } from '../Addcart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const img_url = "https://kivuti.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://kivuti.alwaysdata.net/api/get_products");

      setTimeout(() => {
        setProducts(response.data);
        setLoading(false);
      }, 1500);

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setError("Failed to load products. Check internet connection.");
      }, 1000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);

    toast.success(`${product.product_name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="container-fluid py-3">
      <Prompt />

      <h3 className="text-primary mt-3 text-center">Available Clothes</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-danger text-center">{error}</h4>
      ) : (
        <>
          <Carousel />

          <div className="row mt-4">
            {products.map((product) => (
              <div
                className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4"
                key={product.id}
              >
                <div className="card product-card h-100 border-0 shadow-sm">

                  <div className="image-wrapper">
                    <img
                      src={img_url + product.product_photo}
                      alt={product.product_name}
                      className="card-img-top product-image"
                    />
                  </div>

                  <div className="card-body d-flex flex-column p-3">

                    <h6 className="product-title">
                      {product.product_name}
                    </h6>

                    <p className="product-description">
                      {product.product_description?.slice(0, 40)}
                    </p>

                    <h6 className="product-price">
                      Kes {product.product_cost}
                    </h6>

                    <div className="mt-auto">
                      <button
                        className="btn btn-outline-dark btn-sm w-100 mb-2"
                        onClick={() => navigate("/makepayment", { state: { product } })}
                      >
                        Purchase
                      </button>

                      <button
                        className="btn btn-dark btn-sm w-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        Cart 🛒
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Getproducts;