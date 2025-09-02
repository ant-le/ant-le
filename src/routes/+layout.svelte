<script lang="ts">
    import '../app.css'
    import favicon from '$lib/assets/favicon.svg'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import type { Theme } from '$lib/types'

    let { children } = $props()
    let currentTheme: Theme = $state('minimal')

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
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="font-display bg-bg-primary min-h-screen flex flex-col">
    <Header {toggleTheme} {currentTheme} />
    <main class="flex-1 max-w-5xl mx-auto w-full px-4">
        {@render children?.()}
    </main>
    <Footer />
</div>
