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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success | exists | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");

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

      setMessage("✅ " + response.data.message);
      setStatus("success");

      // clear form
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDob("");
      setGender("Male");

    } catch (err) {
      const msg = err.response?.data?.message?.toLowerCase();

      if (msg && msg.includes("already")) {
        setMessage("⚠️ User already exists. Try logging in.");
        setStatus("exists");
      } else {
        setMessage("❌ Signup failed. Please try again.");
        setStatus("error");
      }
    }

    setLoading(false);
  };

  // =========================
  // MESSAGE COLOR
  // =========================
  const getColor = () => {
    if (status === "success") return "green";
    if (status === "exists") return "#B8860B";
    if (status === "error") return "red";
    return "#000";
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#000" }}>

      <div className="container d-flex justify-content-center align-items-center vh-100">

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

          <h3 className="text-center mb-2" style={{ letterSpacing: "3px", fontWeight: "800" }}>
            MEMBER REGISTRATION
          </h3>

          <p className="text-center mb-4" style={{ color: "#B8860B", fontSize: "12px" }}>
            CREATE YOUR SACRED ACCESS
          </p>

          {/* STATUS MESSAGE */}
          {message && (
            <p style={{ color: getColor(), textAlign: "center" }}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>

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

            <input
              type="tel"
              placeholder="Phone Number"
              className="form-control mb-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

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

            <button
              type="submit"
              className="btn w-100"
              disabled={loading}
              style={{
                backgroundColor: "#B8860B",
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: "2px"
              }}
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
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