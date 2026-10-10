"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  

  return (
    <button
      type="button"
      className="primary-button"
      onClick={() => addToCart(dish)}
    >
      Add to Order
    </button>
  );
}

