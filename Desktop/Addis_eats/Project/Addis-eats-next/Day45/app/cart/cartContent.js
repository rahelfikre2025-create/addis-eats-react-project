"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartContent() {
  const {
    cartItems,
    isLoaded,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="page-section cart-page">
      <div className="section-heading">
        <p className="eyebrow">Your order</p>
        <h1>Your Cart</h1>
      </div>

      {!isLoaded ? (
        <div className="content-card">
          <p>Loading your cart...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="content-card empty-state">
          <h2>Your cart is empty</h2>
          <p>Add something delicious from our menu.</p>
        </div>
      ) : (
        <>
          <div className="checkout-layout">
            <div className="content-card order-list">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <div className="order-copy">
                    <h2>{item.name}</h2>

                    <p>
                      {item.price} ETB × {item.quantity}
                    </p>

                    <p className="order-total">
                      {item.price * item.quantity} ETB
                    </p>
                  </div>

                  <div className="quantity-control">
                    <button
                      type="button"
                      className="quantity-button quantity-button-secondary"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <strong>{item.quantity}</strong>

                    <button
                      type="button"
                      className="quantity-button quantity-button-primary"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-card">
              <p className="eyebrow">Order total</p>

              <h2>Total</h2>

              <p>{total} ETB</p>
            </div>
          </div>

          <div className="cart-actions">
            <Link href="/checkout" className="primary-button">
              Continue to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
