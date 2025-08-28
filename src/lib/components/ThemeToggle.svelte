<script lang="ts">
    import type { Theme } from '$lib/types';


	let { toggleTheme, currentTheme }: {toggleTheme: () => void, currentTheme: Theme} = $props();
</script>

<button
	onclick={toggleTheme}
	class="theme-toggle"
	aria-label="Toggle theme"
	title="Switch between minimal and artistic themes"
>
	{#if currentTheme === 'minimal'}
		<!-- Artistic icon -->
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="3"/>
			<path d="M12 1v6m0 6v6"/>
			<path d="M1 12h6m6 0h6"/>
			<path d="M3.5 3.5l4.5 4.5m6 6l4.5 4.5"/>
			<path d="M20.5 3.5l-4.5 4.5m-6 6l-4.5 4.5"/>
		</svg>
	{:else}
		<!-- Minimal icon -->
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
			<line x1="9" y1="9" x2="15" y2="9"/>
			<line x1="9" y1="12" x2="15" y2="12"/>
			<line x1="9" y1="15" x2="15" y2="15"/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 2px solid var(--color-primary);
		background-color: transparent;
		color: var(--color-primary);
		cursor: pointer;
		transition: all 0.3s ease;
		margin-left: 1rem;
	}

	.theme-toggle:hover {
		background-color: var(--color-primary);
		color: var(--color-text-light);
		transform: scale(1.1);
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}
</style>
