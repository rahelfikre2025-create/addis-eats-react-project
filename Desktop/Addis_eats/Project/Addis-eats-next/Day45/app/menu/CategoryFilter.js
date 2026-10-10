import Link from "next/link";

export default function CategoryFilter({
  categories,
  selectedCategory,
}) {
  return (
    <aside className="content-card category-filter">
      <p className="eyebrow">Categories</p>

      <h2>Browse Menu</h2>

      <div className="category-list">
        <Link
          href="/menu"
          className={
            selectedCategory === "All"
              ? "primary-button"
              : "secondary-button"
          }
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`/menu?category=${encodeURIComponent(category)}`}
            className={
              selectedCategory === category
                ? "primary-button"
                : "secondary-button"
            }
          >
            {category}
          </Link>
        ))}
      </div>
    </aside>
  );
}

