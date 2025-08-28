<script lang="ts">
	import type { FriendsData } from '../types';

	interface Props {
		friend: FriendsData;
		className?: string;
	}

	let { friend, className = '' }: Props = $props();
</script>

<div class="friend-card {className}">
	<div class="friend-content">
		<div class="quote-section">
			<svg class="quote-icon" fill="currentColor" viewBox="0 0 24 24">
				<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
			</svg>
			
			<blockquote class="friend-quote">
				"{friend.text}"
			</blockquote>
		</div>
		
		<div class="friend-info">
			<img 
				src={friend.image} 
				alt={friend.name}
				class="friend-image"
				loading="lazy"
			/>
			<div class="friend-details">
				<h3 class="friend-name">
					{friend.name}
				</h3>
				<p class="friend-role">
					{friend.role}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.friend-card {
		background-color: var(--color-bg-secondary);
		border-radius: 25px;
		box-shadow: var(--shadow-md);
		padding: 1.5rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.friend-card:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	.friend-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.quote-section {
		position: relative;
	}

	.quote-icon {
		position: absolute;
		top: -0.5rem;
		left: -0.5rem;
		width: 2rem;
		height: 2rem;
		color: var(--color-text-tertiary);
		opacity: 0.6;
	}

	.friend-quote {
		color: var(--color-text-secondary);
		font-style: italic;
		line-height: 1.6;
		font-size: 1rem;
		padding-left: 1.5rem;
		margin: 0;
	}

	.friend-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-neutral-200);
	}

	.friend-image {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--color-neutral-200);
		flex-shrink: 0;
	}

	.friend-details {
		flex: 1;
	}

	.friend-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0 0 0.25rem 0;
	}

	.friend-role {
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
		margin: 0;
		font-style: italic;
	}

	/* Minimal theme styles */
	:global([data-theme="minimal"]) .friend-card {
		background-color: transparent;
		border: none;
		box-shadow: none;
		border-radius: 0;
		padding: 1rem 0;
	}

	:global([data-theme="minimal"]) .friend-card:hover {
		transform: none;
	}

	:global([data-theme="minimal"]) .friend-info {
		border-top: none;
		padding-top: 0.5rem;
	}

	:global([data-theme="minimal"]) .friend-quote {
		font-weight: 300;
		letter-spacing: 0.02em;
	}

	:global([data-theme="minimal"]) .friend-name {
		font-weight: 400;
		letter-spacing: 0.05em;
	}

	:global([data-theme="minimal"]) .friend-role {
		font-weight: 300;
		letter-spacing: 0.02em;
	}

	/* Artistic theme styles */
	:global([data-theme="artistic"]) .friend-card {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		border: none;
		box-shadow: var(--shadow-lg);
		border-radius: 30px;
		animation: friendCardFloat 5s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .friend-card:nth-child(odd) {
		animation-delay: 0.5s;
	}

	:global([data-theme="artistic"]) .friend-card:nth-child(even) {
		animation-delay: 1s;
	}

	:global([data-theme="artistic"]) .friend-card:hover {
		transform: translateY(-8px) rotate(1deg) scale(1.02);
		box-shadow: var(--shadow-xl);
		animation-play-state: paused;
	}

	:global([data-theme="artistic"]) .friend-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
		transform: translateX(-100%);
		transition: transform 0.8s ease;
		pointer-events: none;
		border-radius: 30px;
	}

	:global([data-theme="artistic"]) .friend-card:hover::before {
		transform: translateX(100%);
	}

	:global([data-theme="artistic"]) .quote-icon {
		color: var(--color-accent);
		animation: quoteIconPulse 3s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .friend-quote {
		color: var(--color-text-primary);
		font-weight: 500;
		animation: textFadeIn 1s ease-out;
	}

	:global([data-theme="artistic"]) .friend-name {
		background: linear-gradient(45deg, var(--color-text-primary) 0%, var(--color-accent-2) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 700;
	}

	:global([data-theme="artistic"]) .friend-role {
		color: var(--color-accent);
		font-weight: 500;
		animation: roleGlow 2s ease-in-out infinite alternate;
	}

	:global([data-theme="artistic"]) .friend-image {
		border: 3px solid var(--color-accent);
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
		animation: imageFloat 3s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .friend-info {
		border-top-color: var(--color-accent);
		border-top-width: 2px;
	}

	@keyframes friendCardFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-3px); }
	}

	@keyframes quoteIconPulse {
		0%, 100% { transform: scale(1); opacity: 0.6; }
		50% { transform: scale(1.1); opacity: 1; }
	}

	@keyframes textFadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes roleGlow {
		from { filter: drop-shadow(0 0 2px var(--color-accent)); }
		to { filter: drop-shadow(0 0 8px var(--color-accent-2)); }
	}

	@keyframes imageFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-2px); }
	}
</style>
