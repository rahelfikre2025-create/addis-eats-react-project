import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("addis-eats-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("addis-eats-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(dish, quantity = 1) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === dish.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...dish, quantity }];
    });
  }

  function updateQuantity(dishId, quantity) {
    setCartItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((item) => item.id !== dishId);
      }

      return currentItems.map((item) =>
        item.id === dishId ? { ...item, quantity } : item
      );
    });
  }

  function removeFromCart(dishId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== dishId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

 const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

 const itemCount = useMemo(() => {
    return cartItems.reduce(
        (count, item) => count + item.quantity, 0
    );
 }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      itemCount,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, itemCount, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}

export default CartContext;
