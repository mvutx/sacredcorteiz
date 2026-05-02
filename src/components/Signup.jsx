import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("CREATING ACCOUNT...");

    try {
      const formdata = new FormData();
      formdata.append("fullname", fullname);
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);
      formdata.append("dob", dob);
      formdata.append("gender", gender);

      const response = await axios.post(
        "https://kivuti.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess(response.data.message);

      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDob("");
      setGender("Male");

      setTimeout(() => setSuccess(""), 4000);

    } catch (err) {
      setLoading("");
      setError("REGISTRATION FAILED");
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

      {/* CENTER WRAPPER */}
      <div className="container d-flex justify-content-center align-items-center vh-100">

        {/* 🧱 CARD */}
        <div
          className="card p-4 shadow"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #eee",
            borderRadius: "0px",
            color: "#000",
            width: "100%",
            maxWidth: "520px"
          }}
        >

          {/* TITLE */}
          <h3
            className="text-center mb-2"
            style={{
              letterSpacing: "3px",
              fontWeight: "800"
            }}
          >
            MEMBER REGISTRATION
          </h3>

          <p
            className="text-center mb-4"
            style={{
              color: "#B8860B",
              fontSize: "12px",
              letterSpacing: "2px"
            }}
          >
            CREATE YOUR SACRED ACCESS
          </p>

          {/* STATUS */}
          {loading && <p style={{ color: "#B8860B" }}>{loading}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>

            {/* ROW 1 */}
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-control mb-3"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control mb-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <input
              type="tel"
              placeholder="Phone Number"
              className="form-control mb-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            {/* DOB + GENDER */}
            <div className="row">
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control mb-3"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-control mb-3"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#B8860B",
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: "2px"
              }}
            >
              CREATE ACCOUNT
            </button>

            <p className="text-center mt-3" style={{ fontSize: "12px" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "#B8860B" }}>
                Sign in
              </Link>
            </p>

          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;