<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        title,
        defaultOpen = false,
        className = '',
        contentClass = 'mt-5 space-y-4',
        summary,
        children,
    }: {
        title: string
        summaryItems?: string[]
        defaultOpen?: boolean
        indicatorLabels?: { open: string; closed: string }
        className?: string
        summaryClass?: string
        contentClass?: string
        summarySeparator?: string
        summary?: string
        children?: Snippet
    } = $props()

    let isOpen = $state(defaultOpen)
</script>

<details class={`group ${className}`} bind:open={isOpen}>
    <summary class="flex cursor-pointer list-none flex-col gap-3 text-left">
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <span
                    class="text-xs text-text-secondary/60 transition-transform duration-200 group-open:rotate-90 artistic:text-accent-pink"
                    aria-hidden="true"
                >
                    ▶
                </span>
                <h3>
                    {title}
                </h3>
                {#if !isOpen}
                    <p>{summary}</p>
                {/if}
            </div>
        </div>
    </summary>
    <div class={contentClass}>
        {#if children}
            {@render children()}
        {/if}
    </div>
</details>
