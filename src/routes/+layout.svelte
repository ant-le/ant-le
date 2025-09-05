<script lang="ts">
    import '../app.css'
    import icon from '$lib/assets/icon.svg'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import type { Theme } from '$lib/types/types'

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
    <link rel="icon" href={icon} />
</svelte:head>

<div class="font-display bg-bg-primary min-h-screen flex flex-col">
    <Header {toggleTheme} {currentTheme} />
    <main class="flex-1 w-full flex flex-col items-center mt-16">
        <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {@render children?.()}
        </div>
    </main>
    <Footer />
</div>
