<script lang="ts">
    import { browser } from '$app/environment'

    interface Props {
        threshold?: number
        children: import('svelte').Snippet<[boolean]>
    }

    let { threshold = 0.1, children }: Props = $props()

    let element: HTMLElement
    let isVisible = $state(false)

    $effect(() => {
        // Ensure this only runs in the browser where IntersectionObserver exists
        if (!browser || !element) return

        const options = {
            root: null, // observes intersections relative to the viewport
            rootMargin: '0px',
            threshold: threshold, // Use the prop to define visibility percentage
        }

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                isVisible = true
                // Stop observing once it's visible to avoid unnecessary work
                observer.unobserve(element)
            }
        }, options)

        observer.observe(element)

        // Cleanup function: disconnect observer when component is destroyed
        return () => observer.disconnect()
    })
</script>

<div bind:this={element}>
    {@render children(isVisible)}
</div>
