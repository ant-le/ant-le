<script lang="ts">
	interface Props {
		text: string;
		align?: 'left' | 'center' | 'right';
		variant?: 'default' | 'minimal' | 'highlighted';
		className?: string;
	}

	let { text, align = 'left', variant = 'default', className = '' }: Props = $props();
</script>

<div 
	class="text-card {variant} {className}"
	style="text-align: {align};"
>
	<p class="text-card-content">
		{text}
	</p>
</div>

<style>
	.text-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-neutral-200);
		padding: var(--space-4);
		transition: all 0.3s ease;
	}

	.text-card-content {
		font-family: var(--font-family-primary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--color-text-secondary);
		margin: 0;
	}

	/* Variant styles */
	.text-card.default {
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
	}

	.text-card.highlighted {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-primary);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
	}

	.text-card.minimal {
		background-color: transparent;
		border-color: var(--color-neutral-300);
		border-radius: 0; /* No corners for minimal style */
		box-shadow: none;
	}

	/* Theme-specific styles */
	:global([data-theme="minimal"]) .text-card {
		background-color: transparent;
		border: none;
		border-radius: 0; /* No corners in minimal theme */
		box-shadow: none;
		padding: 0.5rem 0; /* Reduce padding for minimal look */
	}

	:global([data-theme="minimal"]) .text-card-content {
		color: var(--color-text-primary);
		font-weight: 300; /* Lighter font weight for minimal look */
		letter-spacing: 0.02em;
	}

	:global([data-theme="artistic"]) .text-card {
		background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
		border: none;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		animation: textCardFloat 3s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .text-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		animation-play-state: paused;
	}

	:global([data-theme="artistic"]) .text-card.highlighted {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		box-shadow: var(--shadow-lg);
	}

	:global([data-theme="artistic"]) .text-card.minimal {
		background: transparent;
		border: 1px solid var(--color-accent);
		border-radius: var(--radius-md);
	}

	@keyframes textCardFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-3px); }
	}
</style>
