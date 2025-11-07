<script lang="ts">
    import '../app.css'
    import icon from '$lib/assets/icon.svg'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import type { Theme } from '$lib/types/types'
    import { fade } from 'svelte/transition'
    import { page } from '$app/state'

    let { children } = $props()
    let currentTheme: Theme = $state('minimal')
    let currentPage = $derived(page.url.pathname)

    $effect(() => {
        if (currentTheme === 'artistic') {
            document.documentElement.setAttribute('data-theme', 'artistic')
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    })

    export function toggleTheme() {
        currentTheme = currentTheme === 'minimal' ? 'artistic' : 'minimal'
    }
</script>

<svelte:head>
    <link rel="icon" href={icon} />
</svelte:head>

<div
    class="font-body bg-bg-primary text-text-primary min-h-screen flex flex-col"
>
    <Header {toggleTheme} {currentTheme} />
    <main class="flex-1 w-full flex flex-col items-center">
        {#key currentPage}
            <div
                class="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1"
                in:fade={{ delay: 200, duration: 400 }}
            >
                {@render children?.()}
            </div>
        {/key}
    </main>
    <Footer />
</div>
