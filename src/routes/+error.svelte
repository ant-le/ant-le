<script lang="ts">
	import { page } from '$app/state';
	
	// Get error details from the page store
	let error = $state(page.error);
	let status = $state(page.status);
	
	// Determine error type and message
	let isNotFound = $derived(status === 404);
	let errorMessage = $derived(isNotFound 
		? "This site does not exist" 
		: "There was an unexpected error"
    );
	let errorDescription = $derived(isNotFound
		? "The page you're looking for couldn't be found. It might have been moved, deleted, or you entered the wrong URL."
		: "Something went wrong on our end. Please try again later or contact support if the problem persists."
    );
	

</script>

<svelte:head>
	<title>Anton Lechuga | {isNotFound ? 'Page Not Found' : 'Error'}</title>
</svelte:head>

<div class="error-page">
	<div class="error-container">
		<!-- Error Icon -->
		<div class="error-icon">
			<div class="icon-wrapper">
				<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isNotFound}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"></path>
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
					{/if}
				</svg>
			</div>
		</div>
		
		<!-- Error Status -->
		<div class="error-status">
			<h1 class="status-number">{status}</h1>
		</div>
		
		<!-- Error Message -->
		<div class="error-content">
			<h2 class="error-title">
				{errorMessage}
			</h2>
			<p class="error-description">
				{errorDescription}
			</p>
		</div>
		
		<!-- Error Details (for development) -->
		{#if error && import.meta.env.DEV}
			<div class="error-details">
				<h3 class="details-title">Error Details (Development):</h3>
				<pre class="details-content">{error.message}</pre>
			</div>
		{/if}
				
		<!-- Additional Help -->
		<div class="error-help">
			<p>If you continue to experience issues, please check the URL or try refreshing the page.</p>
		</div>
	</div>
</div>

<style>
	.error-page {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-6);
		animation: fadeInUp 0.8s ease-out;
	}

	.error-container {
		max-width: 500px;
		width: 100%;
		text-align: center;
	}

	/* Error Icon */
	.error-icon {
		margin-bottom: var(--space-8);
	}

	.icon-wrapper {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-color: var(--color-bg-tertiary);
		border: 2px solid var(--color-neutral-300);
		transition: all 0.3s ease;
		animation: iconPulse 2s ease-in-out infinite;
	}

	.icon {
		width: 48px;
		height: 48px;
		color: var(--color-text-secondary);
	}

	/* Error Status */
	.error-status {
		margin-bottom: var(--space-6);
	}

	.status-number {
		font-family: var(--font-family-primary);
		font-size: 6rem;
		font-weight: var(--font-weight-bold);
		line-height: 1;
		color: var(--color-text-primary);
		margin: 0;
		animation: numberGlow 3s ease-in-out infinite alternate;
	}

	/* Error Content */
	.error-content {
		margin-bottom: var(--space-8);
	}

	.error-title {
		font-family: var(--font-family-primary);
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--color-text-primary);
		margin: 0 0 var(--space-4) 0;
	}

	.error-description {
		font-family: var(--font-family-primary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--color-text-secondary);
		margin: 0;
	}

	/* Error Details */
	.error-details {
		margin-bottom: var(--space-8);
		padding: var(--space-4);
		background-color: var(--color-bg-tertiary);
		border-radius: var(--radius-md);
		text-align: left;
	}

	.details-title {
		font-family: var(--font-family-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-secondary);
		margin: 0 0 var(--space-2) 0;
	}

	.details-content {
		font-family: var(--font-family-system);
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
		margin: 0;
		overflow: auto;
		white-space: pre-wrap;
	}

	/* Error Help */
	.error-help {
		font-family: var(--font-family-primary);
		font-size: var(--font-size-sm);
		color: var(--color-text-tertiary);
	}

	.error-help p {
		margin: 0;
	}

	/* Animations */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes iconPulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(var(--color-primary), 0.4);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 0 10px rgba(var(--color-primary), 0);
		}
	}

	@keyframes numberGlow {
		from {
			filter: drop-shadow(0 0 5px var(--color-primary));
		}
		to {
			filter: drop-shadow(0 0 15px var(--color-accent));
		}
	}

	/* Theme-specific styles */
	:global([data-theme="minimal"]) .error-page {
		background-color: var(--color-bg-primary);
	}

	:global([data-theme="minimal"]) .icon-wrapper {
		background-color: transparent;
		border-color: var(--color-neutral-400);
		animation: none;
	}

	:global([data-theme="minimal"]) .icon {
		color: var(--color-text-secondary);
	}

	:global([data-theme="minimal"]) .status-number {
		color: var(--color-text-primary);
		animation: none;
		font-weight: 300;
	}

	:global([data-theme="minimal"]) .error-title {
		color: var(--color-text-primary);
		font-weight: 300;
		letter-spacing: 0.02em;
	}

	:global([data-theme="minimal"]) .error-description {
		color: var(--color-text-secondary);
		font-weight: 300;
	}

	:global([data-theme="minimal"]) .error-details {
		background-color: transparent;
		border: 1px solid var(--color-neutral-400);
	}

	:global([data-theme="artistic"]) .error-page {
		background-color: var(--color-bg-primary);
	}

	:global([data-theme="artistic"]) .icon-wrapper {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		border: none;
		box-shadow: var(--shadow-lg);
		animation: iconFloat 3s ease-in-out infinite;
	}

	:global([data-theme="artistic"]) .icon {
		color: var(--color-text-light);
	}

	:global([data-theme="artistic"]) .status-number {
		background: linear-gradient(45deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-accent-2) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: textGlow 3s ease-in-out infinite alternate;
	}

	:global([data-theme="artistic"]) .error-title {
		background: linear-gradient(45deg, var(--color-primary) 0%, var(--color-accent) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: textGlow 3s ease-in-out infinite alternate;
	}

	:global([data-theme="artistic"]) .error-description {
		color: var(--color-text-secondary);
		animation: fadeIn 1.5s ease-out;
	}

	:global([data-theme="artistic"]) .error-details {
		background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
		border: none;
		box-shadow: var(--shadow-md);
	}

	@keyframes iconFloat {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-10px) scale(1.05); }
	}

	@keyframes textGlow {
		from {
			filter: drop-shadow(0 0 5px var(--color-primary));
		}
		to {
			filter: drop-shadow(0 0 15px var(--color-accent));
		}
	}
</style>
