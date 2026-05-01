import React, { useState, useEffect } from "react";

const Prompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // =========================
  // SHOW ONLY IF NOT SUBSCRIBED
  // =========================
  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed");

    if (isSubscribed === "true") {
      return; // never show popup again
    }

    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // SUBSCRIBE HANDLER
  // =========================
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch(
        "https://sacredcorteiz.onrender.com/api/subscribe",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setSuccess(data.message || "Subscribed successfully!");
      setEmail("");

      // ✅ MARK USER AS SUBSCRIBED (IMPORTANT PART)
      localStorage.setItem("isSubscribed", "true");

      setTimeout(() => {
        setSuccess("");
        setShowPrompt(false);
      }, 3000);
    } catch (err) {
      setError(err.message);

      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
    // DO NOT mark as subscribed — just temporary close
  };

  if (!showPrompt) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            border: "none",
            background: "transparent",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h3>Subscribe to our Emails</h3>
        <p>Get updates and exclusive offers.</p>

        <form
          onSubmit={handleSubscribe}
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "15px",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              flex: 1,
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: loading ? "gray" : "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>

        {success && (
          <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
        )}
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Prompt;