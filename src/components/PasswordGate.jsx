import React, { useState } from "react";

const PasswordGate = ({ onUnlock }) => {
  const [password, setPassword] = useState("");

  const correctPassword = "sacred";

  const handleSubmit = () => {
    if (password === correctPassword) {
      onUnlock();
    } else {
      alert("ACCESS DENIED");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        letterSpacing: "2px"
      }}
    >
      {/* 🔥 BRAND */}
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "900",
          letterSpacing: "8px",
          color: "#FFD700",
          marginBottom: "10px"
        }}
      >
        SACRED VANITY
      </h1>

      <p
        style={{
          color: "#888",
          fontSize: "11px",
          letterSpacing: "4px",
          marginBottom: "40px"
        }}
      >
        PRIVATE DROP ACCESS ONLY
      </p>

      {/* INPUT */}
      <input
        type="password"
        placeholder="ENTER ACCESS CODE"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "260px",
          padding: "12px",
          background: "transparent",
          border: "1px solid #222",
          color: "#fff",
          outline: "none",
          textAlign: "center",
          letterSpacing: "3px",
          marginBottom: "15px"
        }}
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        style={{
          width: "260px",
          padding: "12px",
          background: "#FFD700",
          border: "none",
          color: "#000",
          fontWeight: "900",
          letterSpacing: "3px",
          cursor: "pointer"
        }}
      >
        ENTER
      </button>

      <p
        style={{
          marginTop: "40px",
          fontSize: "10px",
          color: "#555",
          letterSpacing: "3px"
        }}
      >
        NOT EVERYONE IS GRANTED ACCESS
      </p>
    </div>
  );
};

export default PasswordGate;