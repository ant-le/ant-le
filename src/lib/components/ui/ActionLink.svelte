<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        children,
        class: className = '',
        href,
        type = 'button',
        target,
        rel,
        download,
        onclick,
    }: {
        children: Snippet
        class?: string
        href?: string
        type?: 'button' | 'submit' | 'reset'
        target?: string
        rel?: string
        download?: string
        onclick?: (event: MouseEvent) => void
    } = $props()

    const classes = $derived([
        'border-ink shadow-brutal-sm hover:shadow-brutal-md inline-block whitespace-nowrap border-4 px-[0.8rem] py-[0.55rem] text-[0.85rem] font-black text-inherit no-underline uppercase transition-[transform,box-shadow] duration-[120ms] hover:-translate-x-0.5 hover:-translate-y-0.5 max-sm:border-[3px] max-sm:px-2 max-sm:py-[0.35rem] max-sm:text-[0.68rem] max-sm:shadow-[4px_4px_0_var(--color-ink)]',
        className,
    ])
</script>

{#if href}
    <a class={classes} {href} {target} {rel} {download} {onclick}>
        {@render children()}
    </a>
{:else}
    <button class={classes} {type} {onclick}>
        {@render children()}
    </button>
{/if}
