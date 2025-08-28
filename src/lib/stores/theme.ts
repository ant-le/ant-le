import { writable } from 'svelte/store';

export type Theme = 'minimal' | 'artistic';

export const theme = writable<Theme>('minimal');

export function toggleTheme() {
	theme.update(current => current === 'minimal' ? 'artistic' : 'minimal');
}
