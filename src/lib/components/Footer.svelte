<script lang="ts">
	const socialLinks = [
		{ name: 'Strava', href: 'https://www.strava.com/athletes/your-profile', icon: 'S', artisticIcon: '🏃‍♂️' },
		{ name: 'GitHub', href: 'https://github.com/your-username', icon: 'G', artisticIcon: '💻' },
		{ name: 'Email', href: 'mailto:your-email@example.com', icon: 'E', artisticIcon: '📧' }
	];
</script>

<footer class="footer">
	<div class="container py-8">
		<div class="flex flex-col items-center space-y-4">
			<!-- Social Links -->
			<div class="flex space-x-8">
				{#each socialLinks as link}
					<a
						href={link.href}
						class="social-link"
						aria-label={link.name}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div class="social-icon">
							<span class="minimal-icon">{link.icon}</span>
							<span class="artistic-icon">{link.artisticIcon}</span>
						</div>
						<span class="social-label">
							{link.name}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--color-bg-secondary);
		border-top: 1px solid var(--color-neutral-200);
		transition: all 0.3s ease;
	}

	.social-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text-tertiary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.social-link:hover {
		color: var(--color-text-secondary);
	}

	.social-icon {
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-bg-tertiary);
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-text-tertiary);
		transition: all 0.3s ease;
		position: relative;
	}

	.minimal-icon {
		display: block;
	}

	.artistic-icon {
		display: none;
		font-size: 1.25rem;
	}

	.social-link:hover .social-icon {
		background-color: var(--color-primary);
		color: var(--color-text-light);
	}

	.social-label {
		font-family: var(--font-family-primary);
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	/* Minimal theme footer styling */
	:global([data-theme="minimal"]) .footer {
		background-color: transparent;
		border-top: none;
		padding: 2rem 0;
	}

	:global([data-theme="minimal"]) .social-icon {
		display: none;
	}

	:global([data-theme="minimal"]) .social-link {
		flex-direction: row;
		gap: 1rem;
		padding: 0.25rem 0;
		font-weight: 300;
		letter-spacing: 0.05em;
	}

	:global([data-theme="minimal"]) .social-label {
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
	}

	/* Show artistic icons in artistic theme */
	:global([data-theme="artistic"]) .minimal-icon {
		display: none;
	}

	:global([data-theme="artistic"]) .artistic-icon {
		display: block;
	}

	/* Artistic theme experimental styling */
	:global([data-theme="artistic"]) .footer {
		background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
		border-top: 3px solid var(--color-accent);
		box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
		animation: footerGlow 3s ease-in-out infinite alternate;
		padding: 2rem 0;
	}

	:global([data-theme="artistic"]) .social-link {
		position: relative;
		overflow: hidden;
		border-radius: 15px;
		padding: 0.5rem;
		transition: all 0.3s ease;
	}

	:global([data-theme="artistic"]) .social-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
		transition: left 0.6s ease;
	}

	:global([data-theme="artistic"]) .social-link:hover::before {
		left: 100%;
	}

	:global([data-theme="artistic"]) .social-link:hover {
		transform: translateY(-5px) scale(1.1);
	}

	:global([data-theme="artistic"]) .social-icon {
		background: linear-gradient(45deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
		border-radius: 50%;
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
		animation: socialIconFloat 2s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .social-link:hover .social-icon {
		animation: socialIconSpin 0.6s ease-in-out;
	}

	@keyframes footerGlow {
		from { box-shadow: 0 -4px 20px rgba(0,0,0,0.1); }
		to { box-shadow: 0 -4px 30px rgba(0,0,0,0.2); }
	}

	@keyframes socialIconFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-3px); }
	}

	@keyframes socialIconSpin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
