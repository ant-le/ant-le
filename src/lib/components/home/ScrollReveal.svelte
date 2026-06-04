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

    const reveal: Attachment = (element) => {
        if (!('IntersectionObserver' in window)) {
            element.classList.add('is-visible')
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return

                element.classList.add('is-visible')
                observer.disconnect()
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }
</script>

<div
    class={['scroll-reveal', className]}
    style:transition-delay={`${delay}ms`}
    {@attach reveal}
>
    {@render children()}
</div>
