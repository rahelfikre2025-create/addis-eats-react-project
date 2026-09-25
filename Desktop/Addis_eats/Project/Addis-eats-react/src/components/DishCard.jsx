import { Link } from "react-router-dom";
import FavoriteButton from "../favorites/FavoriteButton";

function DishCard({ dish, onAdd }) {
  function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();

    onAdd(dish);
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link
          to={`/menu/${dish.id}`}
          className="block h-full"
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {dish.spicy && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              🌶️ Spicy
            </span>
          )}
        </Link>

        <FavoriteButton dish={dish} />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
          {dish.category}
        </p>

        <Link to={`/menu/${dish.id}`}>
          <h2 className="font-serif text-xl transition-colors hover:text-accent">
            {dish.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-muted-foreground">
          {dish.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-semibold">
            {dish.price.toLocaleString()} ETB
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            + Add
          </button>
        </div>

      </div>
    </article>
  );
}

export default DishCard;