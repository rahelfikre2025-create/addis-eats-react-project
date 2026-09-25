import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import getDishes from "../api/dishes";
import DishList from "../components/DishList";
import { useCart } from "../cart/CartContext";
import { useFavorites } from "./FavoritesContext";

function Favorites() {
	const { favoriteIds, clearFavorites } = useFavorites();
	const { addToCart } = useCart();
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
					setError("Failed to load your favorites. Please try again.");
				}
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		}

		loadDishes();

		return () => controller.abort();
	}, []);

	const favoriteDishes = useMemo(
		() =>
			dishes.filter((dish) =>
				favoriteIds.some((favoriteId) => String(favoriteId) === String(dish.id))
			),
		[dishes, favoriteIds]
	);

	const hasMissingDishes = favoriteDishes.length < favoriteIds.length;

	return (
		<div className="fade-in">
			<section className="border-b border-border px-6 pb-10 pt-12 md:px-12 md:pt-16">
				<div className="mx-auto max-w-7xl">
					<p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
						Saved for later
					</p>
					<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
						<div>
							<h1 className="font-serif text-4xl font-light md:text-5xl">
								Your favorite dishes.
							</h1>
							<p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
								Keep the dishes you love close by and add them to your cart whenever you are ready.
							</p>
						</div>

						{favoriteIds.length > 0 && (
							<button
								type="button"
								onClick={clearFavorites}
								className="inline-flex w-fit items-center rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
							>
								Clear favorites
							</button>
						)}
					</div>
				</div>
			</section>

			<section className="px-6 py-10 md:px-12 md:py-12">
				<div className="mx-auto max-w-7xl">
					{loading && (
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{[1, 2, 3, 4].map((item) => (
								<div key={item} className="overflow-hidden rounded-2xl border border-border bg-card">
									<div className="aspect-[4/3] animate-pulse bg-muted" />
									<div className="space-y-3 p-5">
										<div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
										<div className="h-4 w-full animate-pulse rounded bg-muted" />
									</div>
								</div>
							))}
						</div>
					)}

					{!loading && error && (
						<div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
							<div className="mb-4 text-4xl">😕</div>
							<h2 className="font-serif text-2xl">We couldn't load your favorites</h2>
							<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{error}</p>
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
							>
								Try again
							</button>
						</div>
					)}

					{!loading && !error && favoriteDishes.length > 0 && (
						<>
							<DishList dishes={favoriteDishes} onAdd={addToCart} />
							{hasMissingDishes && (
								<p className="mt-6 text-sm text-muted-foreground">
									Some saved dishes are no longer available and were not shown.
								</p>
							)}
						</>
					)}

					{!loading && !error && favoriteDishes.length === 0 && (
						<div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
							<div className="mb-4 text-5xl">♡</div>
							<h2 className="font-serif text-3xl">No favorites yet.</h2>
							<p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
								Save your favorite dishes here so you can find them easily.
							</p>
							<Link
								to="/menu"
								className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
							>
								Browse menu
							</Link>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default Favorites;
