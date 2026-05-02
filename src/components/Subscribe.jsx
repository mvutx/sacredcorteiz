import React, { useState } from "react";
import axios from "axios";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3 className="mb-3 text-success">Subscribe to our newsletter</h3>

        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Subscribe;