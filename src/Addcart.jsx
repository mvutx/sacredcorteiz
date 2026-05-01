import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const CartContext = createContext(null);

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

// Provider
export const CartProvider = ({ children }) => {

  // =========================
  // LOAD CART FROM LOCALSTORAGE
  // =========================
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (err) {
      return [];
    }
  });

  // =========================
  // SAVE CART ON CHANGE
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product) => {
    if (!product) return;

    const id = product.id || product.product_id;

    if (!id) {
      console.warn("Product missing ID:", product);
      return;
    }

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: (item.quantity ?? 1) + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          id,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // REMOVE ONE ITEM
  // =========================
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: (item.quantity ?? 1) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // DELETE COMPLETELY
  // =========================
  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};