<script lang="ts">
    import type { Attachment } from 'svelte/attachments'
    import type { Snippet } from 'svelte'

    let {
        children,
        class: className = '',
        delay = 0,
    }: {
        children: Snippet
        class?: string
        delay?: number
    } = $props()

    let isVisible = $state(false)

    const reveal: Attachment = (element) => {
        if (!('IntersectionObserver' in window)) {
            isVisible = true
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) return
                isVisible = entry.isIntersecting
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }
</script>

<div
    class={[
        'transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-8 scale-[0.97] opacity-0',
        className,
    ]}
    style:transition-delay={`${delay}ms`}
    {@attach reveal}
>
    {@render children()}
</div>
