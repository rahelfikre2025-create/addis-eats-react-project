import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import getDishes from "../api/dishes";
import CategoryBar from "../components/CategoryBar";
import DishList from "../components/DishList";
import { useCart } from "../cart/CartContext";

function Menu() {
    

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";
  const searchFromUrl = searchParams.get("search") || "";

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      try {
        setLoading(true);
        setError("");

        const data = await getDishes(controller.signal);

        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load the menu. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDishes();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredDishes = useMemo(() => {
    const normalizedSearch = searchFromUrl.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        categoryFromUrl === "All" ||
        dish.category.toLowerCase() === categoryFromUrl.toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        dish.name.toLowerCase().includes(normalizedSearch) ||
        dish.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [dishes, categoryFromUrl, searchFromUrl]);

  function handleCategorySelect(category) {
    const params = new URLSearchParams(searchParams);

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    setSearchParams(params);
  }

  function handleSearch(event) {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", value);
    }

    setSearchParams(params);
  }

  function clearFilters() {
    setSearchParams({});
  }

  return (
    <div className="fade-in">

      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-border px-6 pb-10 pt-12 md:px-12 md:pt-16">
        <div className="mx-auto max-w-7xl">

          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Our menu
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <h1 className="font-serif text-4xl font-light md:text-5xl">
                Something delicious
                <br className="hidden sm:block" />
                is waiting for you.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                Explore Ethiopian favorites, pizza, burgers and refreshing
                drinks from Addis Eats.
              </p>
            </div>

            <Link
              to="/cart"
              className="inline-flex w-fit items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View your cart →
            </Link>

          </div>

        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="px-6 pt-8 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Search */}
          <div className="mb-6 max-w-xl">
            <label
              htmlFor="menu-search"
              className="mb-2 block text-sm font-medium"
            >
              Search dishes
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                🔍
              </span>

              <input
                id="menu-search"
                type="search"
                value={searchFromUrl}
                onChange={handleSearch}
                placeholder="Search for a dish..."
                className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>

          {/* Categories */}
          <CategoryBar
            selected={categoryFromUrl}
            onSelect={handleCategorySelect}
          />

        </div>
      </section>

      {/* ================= MENU ================= */}
      <section className="px-6 py-10 md:px-12 md:py-12">
        <div className="mx-auto max-w-7xl">

          {/* Result information */}
          {!loading && !error && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

              <div>
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredDishes.length}
                  </span>{" "}
                  {filteredDishes.length === 1 ? "dish" : "dishes"}
                </p>
              </div>

              {(categoryFromUrl !== "All" || searchFromUrl) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Clear filters
                </button>
              )}

            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-[4/3] animate-pulse bg-muted" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">

              <div className="mb-4 text-4xl">😕</div>

              <h2 className="font-serif text-2xl">
                We couldn't load the menu
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Try again
              </button>

            </div>
          )}

          {/* Dishes */}
          {!loading && !error && (
            <DishList
              dishes={filteredDishes}
              onAdd={addToCart}
            />
          )}

        </div>
      </section>

    </div>
  );
}

export default Menu;