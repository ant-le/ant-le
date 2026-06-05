<script lang="ts">
    import { page } from '$app/state'
    import { fly } from 'svelte/transition'
    import '../app.css'

    let { children } = $props()

    const routeTransition = { duration: 180, y: 12 }
</script>

{#key page.url.pathname}
    <div transition:fly={routeTransition}>
        {@render children()}
    </div>
{/key}
