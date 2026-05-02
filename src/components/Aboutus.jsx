import React from "react";
import Footer from "./Footer";

const Aboutus = () => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden"
      }}
      className="container-fluid px-3 py-5"
    >
      {/* 🔁 SCROLL TEXT */}
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderTop: "1px solid #222",
          borderBottom: "1px solid #222",
          marginBottom: "40px",
          padding: "10px 0"
        }}
      >
        <div
          style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "scrollText 12s linear infinite",
            fontWeight: "900",
            letterSpacing: "6px",
            fontSize: "13px",
            color: "#FFD700"
          }}
        >
          SACRED VANITY • STAY SANE • SACRED VANITY • STAY SANE •
        </div>
      </div>

      {/* 🔥 HERO */}
      <div className="text-center mb-5">
        <h1
          style={{
            fontSize: "3.8rem",
            fontWeight: "900",
            letterSpacing: "8px",
            color: "#FFD700"
          }}
        >
          SACRED VANITY
        </h1>

        <h5 style={{ marginTop: "10px", letterSpacing: "4px", color: "#aaa" }}>
          STAY SANE
        </h5>

        <p
          className="mt-3"
          style={{
            maxWidth: "600px",
            margin: "auto",
            color: "#888",
            fontSize: "14px",
            letterSpacing: "1px"
          }}
        >
          In a world full of noise, pressure, and distraction — Sacred Vanity
          is your reminder to stay grounded.
        </p>
      </div>

      {/* 🧠 WHAT IT MEANS */}
      <div className="mb-5 text-center">
        <h3
          style={{
            borderBottom: "1px solid #FFD700",
            display: "inline-block",
            paddingBottom: "6px",
            letterSpacing: "3px",
            color: "#FFD700"
          }}
        >
          WHAT IT MEANS
        </h3>

        <div className="mt-4" style={{ maxWidth: "700px", margin: "auto" }}>
          <p style={{ color: "#ccc" }}>
            Sacred Vanity is not just clothing — it’s a mindset.
          </p>

          <p style={{ color: "#888" }}>
            It represents protecting your mind in a chaotic world. Staying
            grounded, focused, and true to yourself while everything around you
            tries to distract, pressure, or break you.
          </p>

          <p style={{ color: "#888" }}>
            It’s about choosing clarity over chaos. Discipline over noise.
            Identity over influence.
          </p>
        </div>
      </div>

      {/* 💻 DIGITAL */}
      <div className="mb-5 text-center">
        <h3
          style={{
            borderBottom: "1px solid #FFD700",
            display: "inline-block",
            paddingBottom: "6px",
            letterSpacing: "3px",
            color: "#FFD700"
          }}
        >
          DIGITAL IDENTITY
        </h3>

        <div className="mt-4" style={{ maxWidth: "700px", margin: "auto" }}>
          <p style={{ color: "#888" }}>
            Sacred Vanity exists at the intersection of fashion and digital culture.
          </p>

          <p style={{ color: "#888" }}>
            In a world driven by screens, algorithms, and endless scrolling —
            we create pieces that remind you to stay real.
          </p>

          <p style={{ color: "#ccc" }}>
            This is more than style. It’s a signal.
          </p>
        </div>
      </div>

      {/* 🔥 CORE */}
      <div className="mb-5 text-center">
        <h3
          style={{
            borderBottom: "1px solid #FFD700",
            display: "inline-block",
            paddingBottom: "6px",
            letterSpacing: "3px",
            color: "#FFD700"
          }}
        >
          CORE PHILOSOPHY
        </h3>

        <div
          className="row mt-4 text-start"
          style={{ maxWidth: "900px", margin: "auto" }}
        >
          <div className="col-md-4 mb-4">
            <h6 style={{ fontWeight: "900", color: "#FFD700" }}>
              01 — STAY GROUNDED
            </h6>
            <p style={{ color: "#888", fontSize: "14px" }}>
              No matter the chaos around you, remain centered.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h6 style={{ fontWeight: "900", color: "#FFD700" }}>
              02 — STAY FOCUSED
            </h6>
            <p style={{ color: "#888", fontSize: "14px" }}>
              Discipline over distraction. Always.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h6 style={{ fontWeight: "900", color: "#FFD700" }}>
              03 — STAY TRUE
            </h6>
            <p style={{ color: "#888", fontSize: "14px" }}>
              Never lose yourself trying to fit into the world.
            </p>
          </div>
        </div>
      </div>

      {/* ⚡ FINAL STATEMENT */}
      <div
        className="text-center py-4 mb-5"
        style={{
          borderTop: "1px solid #FFD700",
          borderBottom: "1px solid #FFD700"
        }}
      >
        <h2
          style={{
            fontWeight: "900",
            letterSpacing: "3px",
            color: "#FFD700"
          }}
        >
          STAY SANE IN A WORLD DESIGNED TO DISTRACT YOU
        </h2>
      </div>

      {/* 👕 FOOTER NOTE */}
      <div className="text-center">
        <p style={{ color: "#777", maxWidth: "600px", margin: "auto" }}>
          Sacred Vanity is not just what you wear — it’s what you stand for.
        </p>
      </div>

      <Footer />

      {/* 🔁 ANIMATION */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default Aboutus;