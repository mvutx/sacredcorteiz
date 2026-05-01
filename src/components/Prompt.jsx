import { useEffect, useState } from "react";

const Prompt = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("promptDismissed");

    if (!dismissed) {
      setShow(true);
    }
  }, []);

  const closePrompt = () => {
    localStorage.setItem("promptDismissed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: "350px",
          textAlign: "center",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h5 style={{ marginBottom: "10px" }}>
          Welcome to the shop 👋
        </h5>

        <p style={{ fontSize: "14px", color: "#555" }}>
          Enjoy shopping with us. Tap close to continue.
        </p>

        <button
          onClick={closePrompt}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: "#dc3545",
            color: "white",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Prompt;