
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Ethiopian",
  spicy: false,
  image: "",
  available: true,
};

const categories = [
  "Ethiopian",
  "Pizza",
  "Burgers",
  "Drinks",
];

function AdminMenu() {
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load menu
  useEffect(() => {
    async function loadMenu() {
      try {
        const savedMenu = localStorage.getItem("addis-eats-admin-menu");

        if (savedMenu) {
          setDishes(JSON.parse(savedMenu));
          return;
        }

        const response = await fetch("/menu-data.json");

        if (!response.ok) {
          throw new Error("Failed to load menu.");
        }

        const data = await response.json();

        setDishes(data);

        localStorage.setItem(
          "addis-eats-admin-menu",
          JSON.stringify(data)
        );
      } catch (error) {
        console.error("Failed to load admin menu:", error);
      }
    }

    loadMenu();
  }, []);

  // Save menu
  function saveMenu(updatedDishes) {
    setDishes(updatedDishes);

    localStorage.setItem(
      "addis-eats-admin-menu",
      JSON.stringify(updatedDishes)
    );
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(dish) {
    setEditingId(dish.id);

    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category: dish.category,
      spicy: dish.spicy,
      image: dish.image,
      available: dish.available !== false,
    });

    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      return;
    }

    if (editingId !== null) {
      const updatedDishes = dishes.map((dish) =>
        dish.id === editingId
          ? {
              ...dish,
              ...formData,
              name: formData.name.trim(),
              price: Number(formData.price),
            }
          : dish
      );

      saveMenu(updatedDishes);
    } else {
      const newDish = {
        id: Date.now(),
        ...formData,
        name: formData.name.trim(),
        price: Number(formData.price),
      };

      saveMenu([...dishes, newDish]);
    }

    closeForm();
  }

  function deleteDish(dishId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dish?"
    );

    if (!confirmed) {
      return;
    }

    const updatedDishes = dishes.filter(
      (dish) => dish.id !== dishId
    );

    saveMenu(updatedDishes);
  }

  function toggleAvailability(dishId) {
    const updatedDishes = dishes.map((dish) =>
      dish.id === dishId
        ? { ...dish, available: dish.available === false }
        : dish
    );

    saveMenu(updatedDishes);
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">
            Addis Eats
          </p>

          <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">
            Menu Management
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Add, edit, and remove dishes from your restaurant menu.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          + Add Dish
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="font-serif text-xl font-bold text-foreground">
              {editingId !== null ? "Edit Dish" : "Add New Dish"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Enter the dish information below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Dish Name
              </label>

              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Doro Wat"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Price (ETB)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="525"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Image URL
              </label>

              <input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/doro-wat.jpg"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the dish..."
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>

            {/* Spicy */}
            <div className="flex items-center gap-3">
              <input
                id="spicy"
                name="spicy"
                type="checkbox"
                checked={formData.spicy}
                onChange={handleChange}
                className="h-4 w-4 accent-accent"
              />

              <label
                htmlFor="spicy"
                className="text-sm font-medium text-foreground"
              >
                🌶️ Spicy dish
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 md:col-span-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                {editingId !== null ? "Save Changes" : "Add Dish"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items */}
      {dishes.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">🍽️</div>

          <h2 className="font-serif text-2xl font-bold text-foreground">
            No menu items
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Add your first dish to the menu.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                {dish.image ? (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">
                    🍽️
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-accent">
                      {dish.category}
                    </p>

                    <h2 className="mt-1 font-serif text-xl font-bold text-foreground">
                      {dish.name}
                    </h2>
                  </div>

                  {dish.spicy && (
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs">
                      🌶️
                    </span>
                  )}
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {dish.description}
                </p>

                <p className="mt-4 text-lg font-bold text-foreground">
                  {dish.price.toLocaleString()} ETB
                </p>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    {dish.available === false ? "Unavailable" : "Available"}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleAvailability(dish.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      dish.available === false
                        ? "bg-success/15 text-success hover:bg-success/25"
                        : "bg-error/10 text-error hover:bg-error/20"
                    }`}
                  >
                    {dish.available === false ? "Make available" : "Disable"}
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(dish)}
                    className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteDish(dish.id)}
                    className="flex-1 rounded-xl border border-error/30 px-4 py-2.5 text-sm font-semibold text-error transition hover:bg-error/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminMenu;

