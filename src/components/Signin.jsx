import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    setLoading("AUTHENTICATING...");
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://kivuti.alwaysdata.net/api/signin",
        formdata
      );

      setLoading("");

      if (response.data.user) {
        setSuccess("ACCESS GRANTED");

        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError("ACCESS DENIED");
      }
    } catch (err) {
      setLoading("");
      setError("SYSTEM ERROR");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        color: "#000",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* 🧠 CENTER */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <form
          onSubmit={handlesubmit}
          style={{
            width: "320px",
            textAlign: "center"
          }}
        >

          {/* TITLE */}
          <h2
            style={{
              letterSpacing: "5px",
              fontWeight: "900",
              marginBottom: "10px",
              color: "#000"
            }}
          >
            MEMBER ACCESS
          </h2>

          <p
            style={{
              color: "#B8860B",
              fontSize: "11px",
              letterSpacing: "3px",
              marginBottom: "25px"
            }}
          >
            ENTER YOUR CREDENTIALS
          </p>

          {/* STATUS */}
          {loading && <p style={{ color: "#B8860B" }}>{loading}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              background: "transparent",
              border: "1px solid #ddd",
              color: "#000",
              textAlign: "center",
              letterSpacing: "2px",
              outline: "none"
            }}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              background: "transparent",
              border: "1px solid #ddd",
              color: "#000",
              textAlign: "center",
              letterSpacing: "2px",
              outline: "none"
            }}
            required
          />

          {/* ENTER BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#B8860B",
              border: "none",
              color: "#fff",
              fontWeight: "900",
              letterSpacing: "3px",
              cursor: "pointer"
            }}
          >
            ENTER
          </button>

          {/* SIGNUP LINK */}
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
            NO ACCOUNT?{" "}
            <Link to="/signup" style={{ color: "#B8860B" }}>
              CREATE ONE
            </Link>
          </p>

        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signin;