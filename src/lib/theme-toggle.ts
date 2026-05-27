import { DARK_THEME, LIGHT_THEME, THEME_STORAGE_KEY } from './theme';

function isDarkTheme(theme: string | undefined) {
	return theme === DARK_THEME;
}

function applyTheme(theme: string) {
	const root = document.documentElement;
	const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
	const label = button?.querySelector<HTMLElement>('[data-theme-label]');
	const darkMode = isDarkTheme(theme);

	root.dataset.theme = darkMode ? DARK_THEME : LIGHT_THEME;
	try {
		sessionStorage.setItem(THEME_STORAGE_KEY, darkMode ? DARK_THEME : LIGHT_THEME);
	} catch {}

	if (button) {
		button.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
	}

	if (label) {
		label.textContent = darkMode ? 'Dark mode' : 'Light mode';
	}
}

export function setupThemeToggle() {
	const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
	if (!button) {
		return;
	}

	let initialTheme = document.documentElement.dataset.theme;
	try {
		initialTheme = sessionStorage.getItem(THEME_STORAGE_KEY) || initialTheme;
	} catch {}

	applyTheme(initialTheme || LIGHT_THEME);

	button.addEventListener('click', () => {
		const currentTheme = document.documentElement.dataset.theme;
		applyTheme(isDarkTheme(currentTheme) ? LIGHT_THEME : DARK_THEME);
	});
}
