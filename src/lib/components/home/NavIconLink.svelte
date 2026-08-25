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

<a
    class={[
        'border-ink bg-paper grid h-full min-h-[3.25rem] min-w-[3.25rem] place-items-center border-r-4 p-[0.65rem] font-black transition-[transform,color,background] duration-[120ms] hover:transform-none max-lg:min-w-[3rem] max-lg:p-[0.55rem] max-md:min-w-[2.7rem] max-md:p-[0.45rem] [&_svg]:h-[1.35rem] [&_svg]:w-[1.35rem] [&_svg]:fill-current max-lg:[&_svg]:h-[1.2rem] max-lg:[&_svg]:w-[1.2rem] max-md:[&_svg]:h-[1.05rem] max-md:[&_svg]:w-[1.05rem]',
        className,
    ]}
    {href}
    aria-label={label}
>
    {@render children()}
</a>
