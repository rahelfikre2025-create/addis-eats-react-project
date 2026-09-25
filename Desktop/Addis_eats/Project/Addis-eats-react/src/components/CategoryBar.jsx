const categories = [
  "All",
  "Ethiopian",
  "Pizza",
  "Burgers",
  "Drinks",
];

function CategoryBar({ selected, onSelect }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-2">
        {categories.map((category) => {
          const isSelected = selected === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBar;