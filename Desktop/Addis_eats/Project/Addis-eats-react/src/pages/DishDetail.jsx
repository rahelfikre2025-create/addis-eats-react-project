import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import getDishes from "../api/dishes";
import { useCart } from "../cart/CartContext";

function DishDetail() {
  const { id } = useParams();

  const { addToCart, updateQuantity } = useCart();

  const [dish, setDish] = useState(null);
  const [relatedDishes, setRelatedDishes] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDish() {
      try {
        setLoading(true);
        setError("");

        const dishes = await getDishes(controller.signal);

        const foundDish = dishes.find(
          (item) => item.id === Number(id)
        );

        if (!foundDish) {
          throw new Error("Dish not found.");
        }

        setDish(foundDish);

        const related = dishes
          .filter(
            (item) =>
              item.category === foundDish.category &&
              item.id !== foundDish.id
          )
          .slice(0, 3);

        setRelatedDishes(related);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load this dish.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDish();

    return () => {
      controller.abort();
    };
  }, [id]);

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function handleAddToCart() {
    if (!dish) return;


    addToCart(dish);

    if (quantity > 1) {
      updateQuantity(dish.id, quantity);
    }
  }

  if (loading) {
    return (
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-2">

            <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />

            <div className="space-y-5">
              <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
              <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-6 w-1/4 animate-pulse rounded bg-muted" />
              <div className="h-20 w-full animate-pulse rounded bg-muted" />
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card px-6 py-16 text-center">

          <div className="mb-4 text-5xl">🍽️</div>

          <h1 className="font-serif text-3xl">
            Dish not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {error}
          </p>

          <Link
            to="/menu"
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Back to menu
          </Link>

        </div>
      </section>
    );
  }

  return (
    <div className="fade-in">

      {/* ================= BACK LINK ================= */}
      <div className="px-6 pb-4 pt-8 md:px-12">
        <div className="mx-auto max-w-6xl">

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to menu
          </Link>

        </div>
      </div>

      {/* ================= DISH ================= */}
      <main className="mx-auto max-w-6xl px-6 pb-16 md:px-12">

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl bg-muted">
            <div className="aspect-[4/3]">
              <img
                src={dish.image}
                alt={dish.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            {/* CATEGORY */}
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              {dish.category}
            </p>

            {/* NAME */}
            <h1 className="mt-3 font-serif text-4xl font-light leading-tight md:text-5xl">
              {dish.name}
            </h1>

            {/* SPICY */}
            {dish.spicy && (
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  🌶️ Spicy
                </span>
              </div>
            )}

            {/* PRICE */}
            <p className="mt-6 text-2xl font-semibold">
              {dish.price.toLocaleString()} ETB
            </p>

            {/* DESCRIPTION */}
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              {dish.description}
            </p>

            {/* DIVIDER */}
            <div className="my-8 h-px bg-border" />

            {/* QUANTITY */}
            <div>
              <p className="mb-3 text-sm font-medium">
                Quantity
              </p>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-lg transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-secondary px-4 font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-lg transition-colors hover:bg-secondary"
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                Add to Cart ·{" "}
                {(dish.price * quantity).toLocaleString()} ETB
              </button>

              <Link
                to="/cart"
                className="flex items-center justify-center rounded-xl border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                View Cart
              </Link>

            </div>

          </div>
        </div>

        {/* ================= RELATED DISHES ================= */}
        {relatedDishes.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">

            <div className="mb-7">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                You may also like
              </p>

              <h2 className="font-serif text-3xl">
                More from {dish.category}
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {relatedDishes.map((relatedDish) => (
                <Link
                  key={relatedDish.id}
                  to={`/menu/${relatedDish.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={relatedDish.image}
                      alt={relatedDish.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">

                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                      {relatedDish.category}
                    </p>

                    <h3 className="font-serif text-xl">
                      {relatedDish.name}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-semibold">
                        {relatedDish.price.toLocaleString()} ETB
                      </p>

                      <span className="text-sm font-medium text-muted-foreground group-hover:text-accent">
                        View →
                      </span>
                    </div>

                  </div>

                </Link>
              ))}

            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default DishDetail;