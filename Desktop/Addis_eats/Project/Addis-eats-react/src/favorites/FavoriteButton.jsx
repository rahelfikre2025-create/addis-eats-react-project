import { useFavorites } from "./FavoritesContext";

function FavoriteButton({ dish }) {
	const { isFavorite, toggleFavorite } = useFavorites();
	const favorite = isFavorite(dish.id);

	function handleClick(event) {
		event.preventDefault();
		event.stopPropagation();
		toggleFavorite(dish.id);
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label={
				favorite
					? `Remove ${dish.name} from favorites`
					: `Add ${dish.name} to favorites`
			}
			title={favorite ? "Remove from favorites" : "Add to favorites"}
			className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-xl shadow-sm transition-all hover:scale-105 hover:bg-background"
		>
			<span aria-hidden="true" className={favorite ? "text-accent" : "text-foreground"}>
				{favorite ? "♥" : "♡"}
			</span>
		</button>
	);
}

export default FavoriteButton;
