import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import getDishes from "../api/dishes";

function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("We couldn't load today's specials.");
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

  const specials = dishes.slice(0, 4);

  return (
    <div className="fade-in">

      <section className="relative min-h-[620px] overflow-hidden">
        <img
          src="../images/hroo.png"
          alt="Delicious Ethiopian food"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 md:px-12">
          <div className="max-w-3xl text-white">

            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-white/80">
              Taste Addis, delivered
            </p>

            <h1 className="font-serif text-5xl font-light leading-[1.05] md:text-6xl lg:text-[4.5rem]">
              Good food.
              <br />
              Good mood.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg">
              Discover delicious Ethiopian favorites and everyday comfort
              food from Addis Eats.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                Explore the menu
              </Link>

              <Link
                to="/menu?category=Ethiopian"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Ethiopian favorites
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">

          <div className="flex items-center gap-4 border-b border-border px-6 py-6 md:border-b-0 md:border-r md:px-12">
            <span className="text-2xl">🍴</span>

            <div>
              <p className="font-medium">Fresh & delicious</p>
              <p className="text-sm text-muted-foreground">
                Made with care
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-border px-6 py-6 md:border-b-0 md:border-r md:px-12">
            <span className="text-2xl">🚴</span>

            <div>
              <p className="font-medium">Easy delivery</p>
              <p className="text-sm text-muted-foreground">
                Straight to your door
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-6 md:px-12">
            <span className="text-2xl">🇪🇹</span>

            <div>
              <p className="font-medium">Made for Addis</p>
              <p className="text-sm text-muted-foreground">
                Local flavors, local love
              </p>
            </div>
          </div>

        </div>
      </section>

      
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                Explore
              </p>

              <h2 className="font-serif text-3xl md:text-4xl">
                What are you craving?
              </h2>
            </div>

            <Link
              to="/menu"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-accent sm:block"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            <Link
              to="/menu?category=Ethiopian"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-sm"
            >
              <div className="mb-5 text-4xl">🇪🇹</div>

              <h3 className="font-serif text-xl">
                Ethiopian
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Traditional favorites
              </p>
            </Link>

            <Link
              to="/menu?category=Pizza"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-sm"
            >
              <div className="mb-5 text-4xl">🍕</div>

              <h3 className="font-serif text-xl">
                Pizza
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Cheesy comfort
              </p>
            </Link>

            <Link
              to="/menu?category=Burgers"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-sm"
            >
              <div className="mb-5 text-4xl">🍔</div>

              <h3 className="font-serif text-xl">
                Burgers
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Juicy & satisfying
              </p>
            </Link>

            <Link
              to="/menu?category=Drinks"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-sm"
            >
              <div className="mb-5 text-4xl">🥭</div>

              <h3 className="font-serif text-xl">
                Drinks
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Something refreshing
              </p>
            </Link>

          </div>
        </div>
      </section>

      
      <section className="bg-secondary px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                Today
              </p>

              <h2 className="font-serif text-3xl md:text-4xl">
                Today's specials
              </h2>
            </div>

            <Link
              to="/menu"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              See menu →
            </Link>
          </div>

         
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-[4/3] animate-pulse bg-muted" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <div className="mb-3 text-3xl">😕</div>

              <h3 className="font-serif text-xl">
                Something went wrong
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {error}
              </p>

              <Link
                to="/menu"
                className="mt-5 inline-block text-sm font-medium text-accent hover:underline"
              >
                Browse menu instead →
              </Link>
            </div>
          )}

          
          {!loading && !error && specials.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <div className="mb-3 text-3xl">🍽️</div>

              <h3 className="font-serif text-xl">
                No specials available right now.
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Check the full menu for more delicious options.
              </p>

              <Link
                to="/menu"
                className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Browse menu
              </Link>
            </div>
          )}

          {/* Dishes */}
          {!loading && !error && specials.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {specials.map((dish) => (
                <Link
                  key={dish.id}
                  to={`/menu/${dish.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                      {dish.category}
                    </p>

                    <h3 className="font-serif text-xl">
                      {dish.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {dish.description}
                    </p>

                    <p className="mt-4 font-semibold">
                      {dish.price.toLocaleString()} ETB
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= PROMO ================= */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16">
            <div className="max-w-2xl">

              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                Addis Eats
              </p>

              <h2 className="font-serif text-3xl md:text-5xl">
                Your next favorite meal is waiting.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-primary-foreground/70">
                From traditional Ethiopian dishes to pizza, burgers and
                refreshing drinks, there is something for everyone.
              </p>

              <Link
                to="/menu"
                className="mt-7 inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Start ordering
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* ================= WHY ADDIS EATS ================= */}
      <section className="border-t border-border px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              Why Addis Eats?
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              Food should feel simple.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">

            <div>
              <div className="mb-4 text-3xl">❤️</div>

              <h3 className="font-serif text-xl">
                Made with care
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We make discovering your next meal simple and enjoyable.
              </p>
            </div>

            <div>
              <div className="mb-4 text-3xl">⚡</div>

              <h3 className="font-serif text-xl">
                Easy ordering
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse, choose your favorite dish, add it to your cart and
                checkout without unnecessary steps.
              </p>
            </div>

            <div>
              <div className="mb-4 text-3xl">🌱</div>

              <h3 className="font-serif text-xl">
                Local flavor
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Ethiopian favorites meet familiar comfort food in one place.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;