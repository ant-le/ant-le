<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
    import type { Theme } from '$lib/types';
	import ThemeToggle from './ThemeToggle.svelte';

	let { toggleTheme, currentTheme }: {toggleTheme: () => void, currentTheme: Theme} = $props();
	const navItems = [
		{ href: '/', label: 'Home', icon: 'H', artisticIcon: '🏠' },
		{ href: '/science', label: 'Science', icon: 'S', artisticIcon: '🔬' },
		{ href: '/running', label: 'Running', icon: 'R', artisticIcon: '🏃' },
		{ href: '/music', label: 'Music', icon: 'M', artisticIcon: '🎵' }
	];
</script>

<header class="header">
	<nav class="container">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<a href="/" class="logo">
				Anton
			</a>

			<!-- Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navItems.slice(1) as item}
					<a
						href={base +item.href}
						class="nav-link {(page.url.pathname === item.href ? 'active' : '')}"
					>
						<span class="nav-icon">
							<span class="minimal-icon">{item.icon}</span>
							<span class="artistic-icon">{item.artisticIcon}</span>
						</span>
						<span class="nav-label">{item.label}</span>
					</a>
				{/each}
			</div>

			<!-- Theme Toggle and Mobile Menu -->
			<div class="flex items-center">
				<ThemeToggle {toggleTheme} {currentTheme}/>
				
				<!-- Mobile menu button -->
				<button
					type="button"
					class="mobile-menu-btn"
					aria-label="Open menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
		</div>
	</nav>
</header>

<style>
	.header {
		background-color: var(--color-bg-secondary);
		border-bottom: 1px solid var(--color-neutral-200);
		transition: all 0.3s ease;
	}

	/* Minimal theme header styling */
	:global([data-theme="minimal"]) .header {
		background-color: transparent;
		border-bottom: none;
		padding: 1.5rem 0;
	}

	.logo {
		font-family: var(--font-family-primary);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.logo:hover {
		color: var(--color-primary);
	}

	.nav-link {
		font-family: var(--font-family-primary);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-link.active {
		color: var(--color-primary);
	}

	.nav-icon {
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-bg-tertiary);
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-text-tertiary);
		position: relative;
	}

	.minimal-icon {
		display: block;
	}

	.artistic-icon {
		display: none;
		font-size: 1rem;
	}

	.nav-label {
		transition: all 0.3s ease;
	}

	/* Hide icons in minimal theme */
	:global([data-theme="minimal"]) .nav-icon {
		display: none;
	}

	:global([data-theme="minimal"]) .nav-link {
		gap: 0;
		padding: 0.25rem 0;
		font-weight: 300;
		letter-spacing: 0.05em;
	}

	:global([data-theme="minimal"]) .logo {
		font-weight: 300;
		letter-spacing: 0.1em;
	}

	/* Show artistic icons in artistic theme */
	:global([data-theme="artistic"]) .minimal-icon {
		display: none;
	}

	:global([data-theme="artistic"]) .artistic-icon {
		display: block;
	}

	/* Artistic theme experimental styling */
	:global([data-theme="artistic"]) .header {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		border-bottom: 3px solid var(--color-accent);
		box-shadow: 0 4px 20px rgba(0,0,0,0.1);
		padding: 1.5rem 0;
	}

	:global([data-theme="artistic"]) .logo {
		background: linear-gradient(45deg, var(--color-text-primary) 0%, var(--color-accent-2) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 800;
		animation: logoGlow 2s ease-in-out infinite alternate;
	}

	:global([data-theme="artistic"]) .nav-link {
		position: relative;
		overflow: hidden;
		border-radius: 20px;
		padding: 0.75rem 1.5rem;
	}

	:global([data-theme="artistic"]) .nav-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
		transition: left 0.5s ease;
	}

	:global([data-theme="artistic"]) .nav-link:hover::before {
		left: 100%;
	}

	:global([data-theme="artistic"]) .nav-link.active {
		background: linear-gradient(45deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
		color: var(--color-text-light);
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
	}

	:global([data-theme="artistic"]) .nav-icon {
		background: linear-gradient(45deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
		border-radius: 50%;
		animation: iconPulse 2s ease-in-out infinite;
	}

	@keyframes logoGlow {
		from { filter: drop-shadow(0 0 5px var(--color-accent)); }
		to { filter: drop-shadow(0 0 15px var(--color-accent-2)); }
	}

	@keyframes iconPulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}

	.mobile-menu-btn {
		display: block;
		padding: 0.5rem;
		color: var(--color-text-tertiary);
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	@media (min-width: 768px) {
		.mobile-menu-btn {
			display: none;
		}
	}

	.mobile-menu-btn:hover {
		color: var(--color-text-secondary);
	}
</style>
