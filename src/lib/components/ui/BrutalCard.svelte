<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        children,
        class: className = '',
        as = 'div',
    }: {
        children: Snippet
        class?: string
        as?: 'article' | 'div' | 'p'
    } = $props()
</script>

<svelte:element
    this={as}
    class={['border-ink shadow-brutal-sm border-4 bg-white p-4', className]}
>
    {@render children()}
</svelte:element>
