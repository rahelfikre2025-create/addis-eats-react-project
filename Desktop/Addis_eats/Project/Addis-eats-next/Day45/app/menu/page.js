
import CategoryFilter from "./CategoryFilter";
import SearchBox from "./SearchBox";
import PaginatedDishes from "./PaginatedDishes";
import dishes from "../../public/menu-data.json";

export const metadata = {
  title: "Menu",
  description:
    "Explore delicious Ethiopian dishes including Doro Wat, Tibs, Kitfo from Addis Eats.",
  alternates: {
    canonical: "/menu",
  },
};

export const revalidate = 3600;

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || "All";

  const categories = [
    ...new Set(dishes.map((dish) => dish.category)),
  ];

  return (
    <main className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Fresh from our kitchen</p>

        <h1>Addis Eats Menu</h1>
        

        <p>
          Choose from our delicious Ethiopian and international dishes.
        </p>

        <SearchBox />
      </div>

      <div className="menu-layout">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
        />
        <PaginatedDishes
          key={selectedCategory}
          category={selectedCategory}
        />
      </div>
    </main>
  );
}
