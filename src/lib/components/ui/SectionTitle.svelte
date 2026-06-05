<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        children,
        class: className = '',
    }: {
        children: Snippet
        class?: string
    } = $props()
</script>

<h2
    class={[
        'border-ink shadow-brutal-md inline-block border-4 px-4 py-3 text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] font-black tracking-[-0.02em] uppercase max-sm:border-[3px] max-sm:px-[0.65rem] max-sm:py-2 max-sm:text-[clamp(1.55rem,8vw,2.4rem)] max-sm:shadow-[5px_5px_0_var(--color-ink)]',
        className,
    ]}
>
    {@render children()}
</h2>
