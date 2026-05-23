import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty } : item
        )
        .filter((item) => item.qty > 0) // auto remove if 0
    );
  };

  // CART COUNT
  const cartCount = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// CUSTOM HOOK
export const useCart = () => useContext(CartContext);