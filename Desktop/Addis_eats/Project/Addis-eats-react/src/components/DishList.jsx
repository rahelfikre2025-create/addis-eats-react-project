import DishCard from "./DishCard";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
        <div className="mb-4 text-4xl">🍽️</div>

        <h2 className="font-serif text-2xl">
          No dishes found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          We couldn't find any dishes matching your search or category.
          Try another search or choose a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

export default DishList;