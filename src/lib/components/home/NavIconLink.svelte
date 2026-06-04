<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        href,
        label,
        class: className,
        children,
    }: {
        href: string
        label: string
        class?: string
        children: Snippet
    } = $props()
</script>

<a class={['nav-icon', className]} {href} aria-label={label}>
    {@render children()}
</a>
