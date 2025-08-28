<script lang="ts">
	import type { BlogPost } from '../types';

	interface Props {
		post: BlogPost;
		className?: string;
	}

	let { post, className = '' }: Props = $props();

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="blog-card {className}">
	<img 
		src={post.image} 
		alt={post.title}
		class="blog-image"
		loading="lazy"
	/>
	
	<div class="blog-content">
		<div class="categories">
			{#each post.categories as category}
				<span class="category-badge">
					{category}
				</span>
			{/each}
		</div>
		
		<h3 class="blog-title">
			{post.title}
		</h3>
		
		<div class="labels">
			{#each post.labels as label}
				<span class="label-badge">
					{label}
				</span>
			{/each}
		</div>
		
		<div class="blog-footer">
			<span class="blog-date">
				{formatDate(post.creationDate)}
			</span>
			
			<a 
				href={post.post}
				class="read-more-btn"
			>
				Read More
				<svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
	.blog-card {
		background-color: var(--color-bg-secondary);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		overflow: hidden;
		transition: all 0.3s ease;
		min-height: 450px; /* Minimum height instead of fixed */
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.blog-card:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	/* Minimal theme styles */
	:global([data-theme="minimal"]) .blog-card {
		background-color: transparent;
		border: 1px solid var(--color-neutral-300);
		box-shadow: none;
		border-radius: 0; /* No rounded corners in minimal theme */
	}

	:global([data-theme="minimal"]) .blog-card:hover {
		border-color: var(--color-neutral-400);
		transform: none;
	}

	:global([data-theme="minimal"]) .category-badge {
		background-color: var(--color-neutral-300);
		color: var(--color-text-primary);
		font-weight: 400;
		border-radius: 0;
	}

	:global([data-theme="minimal"]) .label-badge {
		background-color: var(--color-neutral-400);
		color: var(--color-text-secondary);
		border-radius: 0;
		font-weight: 300;
	}

	:global([data-theme="minimal"]) .read-more-btn {
		background-color: transparent;
		color: var(--color-text-secondary);
		border: 1px solid var(--color-neutral-300);
		border-radius: 0;
		font-weight: 300;
	}

	:global([data-theme="minimal"]) .read-more-btn:hover {
		background-color: var(--color-neutral-300);
		color: var(--color-text-primary);
		transform: none;
	}

	/* Artistic theme styles */
	:global([data-theme="artistic"]) .blog-card {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		border: none;
		box-shadow: var(--shadow-lg);
		border-radius: 20px;
		animation: cardFloat 4s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .blog-card:nth-child(odd) {
		animation-delay: 0.5s;
	}

	:global([data-theme="artistic"]) .blog-card:nth-child(even) {
		animation-delay: 1s;
	}

	:global([data-theme="artistic"]) .blog-card:hover {
		transform: translateY(-12px) rotate(2deg) scale(1.02);
		box-shadow: var(--shadow-xl);
		animation-play-state: paused;
	}

	:global([data-theme="artistic"]) .blog-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
		transform: translateX(-100%);
		transition: transform 0.8s ease;
		pointer-events: none;
		border-radius: 20px;
	}

	:global([data-theme="artistic"]) .blog-card:hover::before {
		transform: translateX(100%);
	}

	@keyframes cardFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	.blog-image {
		width: 100%;
		height: 200px; /* Fixed image height */
		object-fit: cover;
		flex-shrink: 0;
	}

	.blog-content {
		padding: 1.5rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.categories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.category-badge {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--color-primary);
		color: var(--color-text-light);
		border-radius: 9999px;
	}

	/* Artistic theme category badges */
	:global([data-theme="artistic"]) .category-badge {
		background: linear-gradient(45deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
		color: var(--color-text-primary);
		font-weight: 600;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		animation: badgePulse 2s ease-in-out infinite;
		position: relative;
		overflow: hidden;
	}

	:global([data-theme="artistic"]) .category-badge::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
		transition: left 0.5s ease;
	}

	:global([data-theme="artistic"]) .category-badge:hover::before {
		left: 100%;
	}

	@keyframes badgePulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
	}

	.blog-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 0.5rem;
		line-height: 1.4;
		/* Limit to 3 lines with ellipsis for better readability */
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		flex-shrink: 0;
		min-height: 3.5rem; /* Ensure consistent space for titles */
	}

	/* Artistic theme title */
	:global([data-theme="artistic"]) .blog-title {
		font-size: 1.5rem;
		font-weight: 700;
		background: linear-gradient(45deg, var(--color-text-primary) 0%, var(--color-primary-dark) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.labels {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-bottom: 1rem;
		flex: 1; /* Take remaining space */
		align-items: flex-start;
	}

	.label-badge {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-tertiary);
		border-radius: 0.25rem;
	}

	/* Artistic theme label badges */
	:global([data-theme="artistic"]) .label-badge {
		background: linear-gradient(45deg, var(--color-secondary) 0%, var(--color-accent) 100%);
		color: var(--color-text-primary);
		border-radius: 12px;
		font-weight: 500;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	:global([data-theme="artistic"]) .label-badge:hover {
		transform: scale(1.1) rotate(2deg);
		box-shadow: 0 3px 8px rgba(0,0,0,0.2);
	}

	:global([data-theme="artistic"]) .label-badge::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
		transform: translateX(-100%);
		transition: transform 0.4s ease;
	}

	:global([data-theme="artistic"]) .label-badge:hover::after {
		transform: translateX(100%);
	}

	.blog-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto; /* Push to bottom */
		flex-shrink: 0;
	}

	.blog-date {
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
	}

	.read-more-btn {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		background-color: var(--color-primary);
		color: var(--color-text-light);
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.read-more-btn:hover {
		background-color: var(--color-primary-dark);
		transform: translateX(2px);
	}

	/* Artistic theme read more button */
	:global([data-theme="artistic"]) .read-more-btn {
		background: linear-gradient(45deg, var(--color-accent-2) 0%, var(--color-accent) 100%);
		color: var(--color-text-light);
		border-radius: 25px;
		font-weight: 600;
		box-shadow: 0 4px 8px rgba(0,0,0,0.2);
	}

	:global([data-theme="artistic"]) .read-more-btn:hover {
		transform: translateX(4px) scale(1.05);
		box-shadow: 0 6px 12px rgba(0,0,0,0.3);
	}

	.arrow-icon {
		margin-left: 0.5rem;
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease;
	}

	.read-more-btn:hover .arrow-icon {
		transform: translateX(2px);
	}

	/* Artistic theme arrow icon */
	:global([data-theme="artistic"]) .read-more-btn:hover .arrow-icon {
		transform: translateX(4px) rotate(10deg);
	}
</style>
