async function getDishes(signal){
    const savedMenu = localStorage.getItem("addis-eats-admin-menu");

    if (savedMenu) {
        try {
            const parsedMenu = JSON.parse(savedMenu);

            if (Array.isArray(parsedMenu)) {
                return parsedMenu.filter((dish) => dish.available !== false);
            }
        } catch (error) {
            console.warn("Saved menu was invalid. Loading the default menu.");
        }
    }

    const response = await fetch("/menu-data.json", { signal });

    if(!response.ok){
        throw new Error("Failed to load menu data.");
    }

    const dishes = await response.json();
    return dishes.filter((dish) => dish.available !== false);
}
export default getDishes;