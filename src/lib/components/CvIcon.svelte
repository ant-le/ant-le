<script lang="ts">
    let {
        type = 'bullet',
        className = '',
    }: {
        type?: 'bullet' | 'separator'
        className?: string
    } = $props()

    const isBullet = type === 'bullet'
    const baseClasses = isBullet
        ? 'inline-flex h-3 w-3 items-center justify-center text-accent-orange artistic:text-text-primary'
        : 'inline-flex h-1.5 w-1.5 items-center justify-center text-text-secondary/60 artistic:text-text-primary/60'
</script>

<span class={`${baseClasses} ${className}`} aria-hidden="true">
    {#if isBullet}
        <svg viewBox="0 0 8 8" class="h-full w-full" fill="currentColor">
            <path d="M1 1.5 6 4 1 6.5z" />
        </svg>
    {:else}
        <svg viewBox="0 0 8 8" class="h-full w-full" fill="currentColor">
            <circle cx="4" cy="4" r="3" />
        </svg>
    {/if}
</span>
