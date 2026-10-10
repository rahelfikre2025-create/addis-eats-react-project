"use client";

import { useActionState } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../context/CartContext";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

export default function CheckoutPage() {
  const { cartItems, isLoaded, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(
    placeOrder,
    initialState
  );

  if (!isLoaded) {
    return (
      <main className="page-section checkout-page">
        <div className="content-card">
          <p>Loading your cart...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="page-section checkout-page">
        <div className="section-heading">
          <p className="eyebrow">Almost there</p>
          <h1>Checkout</h1>
        </div>
        <div className="content-card empty-state">
          <h2>Your cart is empty</h2>
          <p>Add dishes to your cart before checking out.</p>
          <Link href="/menu" className="primary-button">
            Browse the Menu
          </Link>
        </div>
      </main>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="page-section checkout-page">
      <div className="section-heading">
        <p className="eyebrow">Almost there</p>
        <h1>Checkout</h1>
        <p>Enter your delivery information to place your order.</p>
      </div>

      {state.success && (
        <div className="content-card">
          <p className="success-message">{state.message}</p>
          <Link
            href={`/orders/${state.orderId}`}
            className="primary-button"
            onClick={clearCart}
          >
            View Your Order
          </Link>
        </div>
      )}

      <div className="checkout-layout">
        <form action={formAction} className="checkout-form content-card">
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              cartItems.map(({ id, quantity }) => ({ id, quantity }))
            )}
          />

          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
            {state.fieldErrors?.name?.[0] && (
              <p className="error-message">{state.fieldErrors.name[0]}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" required />
            {state.fieldErrors?.phone?.[0] && (
              <p className="error-message">{state.fieldErrors.phone[0]}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" rows="4" required />
            {state.fieldErrors?.address?.[0] && (
              <p className="error-message">{state.fieldErrors.address[0]}</p>
            )}
          </div>

          {state.fieldErrors?.items?.[0] && (
            <p className="error-message">{state.fieldErrors.items[0]}</p>
          )}
          {state.message && !state.success && (
            <p className="error-message">{state.message}</p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={isPending || state.success}
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>

      </div>
    </main>
  );
}
