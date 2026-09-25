import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const FAVORITES_STORAGE_KEY = "addis-eats-favorites";
const FavoritesContext = createContext(null);

function normalizeDishId(dishId) {
  if (typeof dishId === "number" && Number.isFinite(dishId)) {
    return dishId;
  }

  if (typeof dishId === "string" && dishId.trim() !== "") {
    const numericId = Number(dishId);
    return Number.isNaN(numericId) ? dishId.trim() : numericId;
  }

  return null;
}

function readSavedFavoriteIds() {
  try {
    const savedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(savedFavorites)) {
      return [];
    }

    return [...new Set(savedFavorites.map(normalizeDishId).filter((id) => id !== null))];
  } catch (error) {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(readSavedFavoriteIds);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      // Favorites still work for the current session when storage is unavailable.
    }
  }, [favoriteIds]);

  const isFavorite = useCallback(
    (dishId) => {
      const normalizedId = normalizeDishId(dishId);
      return normalizedId !== null && favoriteIds.includes(normalizedId);
    },
    [favoriteIds]
  );

  const addFavorite = useCallback((dishId) => {
    const normalizedId = normalizeDishId(dishId);

    if (normalizedId === null) {
      return;
    }

    setFavoriteIds((currentIds) =>
      currentIds.includes(normalizedId)
        ? currentIds
        : [...currentIds, normalizedId]
    );
  }, []);

  const removeFavorite = useCallback((dishId) => {
    const normalizedId = normalizeDishId(dishId);

    setFavoriteIds((currentIds) =>
      currentIds.filter((id) => id !== normalizedId)
    );
  }, []);

  const toggleFavorite = useCallback((dishId) => {
    const normalizedId = normalizeDishId(dishId);

    if (normalizedId === null) {
      return;
    }

    setFavoriteIds((currentIds) =>
      currentIds.includes(normalizedId)
        ? currentIds.filter((id) => id !== normalizedId)
        : [...currentIds, normalizedId]
    );
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      favoriteCount: favoriteIds.length,
    }),
    [
      favoriteIds,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
