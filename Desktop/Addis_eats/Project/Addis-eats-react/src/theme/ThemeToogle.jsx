import { useTheme } from "./ThemeContext";

function ThemeToggle() {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg transition-colors hover:bg-secondary"
		>
			<span aria-hidden="true">{isDarkMode ? "☀️" : "🌙"}</span>
		</button>
	);
}

export default ThemeToggle;
