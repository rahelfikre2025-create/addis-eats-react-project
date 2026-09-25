import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "addis-eats-theme";
const ThemeContext = createContext(null);

function getInitialTheme() {
	try {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

		if (savedTheme === "light" || savedTheme === "dark") {
			return savedTheme;
		}
	} catch (error) {
		// Use the system preference when browser storage is unavailable.
	}

	return window.matchMedia?.("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		root.style.colorScheme = theme;

		try {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch (error) {
			// The selected theme still applies for the current session.
		}
	}, [theme]);

	function toggleTheme() {
		setTheme((currentTheme) =>
			currentTheme === "dark" ? "light" : "dark"
		);
	}

	const value = useMemo(
		() => ({
			theme,
			isDarkMode: theme === "dark",
			toggleTheme,
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used inside ThemeProvider");
	}

	return context;
}
