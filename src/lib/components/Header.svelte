<script lang="ts">
    import { resolve } from '$app/paths'

    import { page } from '$app/state'
    import { fly } from 'svelte/transition'
    import type { Theme } from '$lib/types'
    import { onMount } from 'svelte'

    let { toggleTheme, currentTheme } = $props<{
        toggleTheme: () => void
        currentTheme: Theme
    }>()

    let isMobileMenuOpen = $state(false)

    // Element references for the click-outside-to-close functionality
    let triggerElement: HTMLButtonElement
    let dropdownElement: HTMLDivElement

    const navItems = [
        { href: resolve('/'), label: 'Home' },
        { href: resolve('/science'), label: 'Science' },
        { href: resolve('/running'), label: 'Running' },
        { href: resolve('/music'), label: 'Music' },
    ]

    const currentNavItem = $derived(
        navItems.find((item) => item.href === page.url.pathname) ?? navItems[0]
    )
    const otherNavItems = $derived(
        navItems.filter((item) => item.href !== currentNavItem.href)
    )
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen
    }
    function closeMobileMenu() {
        isMobileMenuOpen = false
    }

    $effect(() => {
        if (!isMobileMenuOpen) {
            return
        }

        const handleClickOutside = (event: MouseEvent) => {
            // The logic inside the handler is the same.
            if (
                triggerElement &&
                !triggerElement.contains(event.target as Node) &&
                dropdownElement &&
                !dropdownElement.contains(event.target as Node)
            ) {
                closeMobileMenu()
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    })
</script>

<header
    class="
    /* Minimal theme (default) */
    bg-transparent border-b-0 py-6
    
    /* Artistic theme overrides */
    artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:border-b-2 artistic:border-accent artistic:transition-all artistic:duration-300 artistic:shadow-lg
"
>
    <nav class="max-w-5xl mx-auto px-4 relative">
        <div class="flex justify-between items-center">
            <a
                href={navItems[0].href}
                class="
                /* Minimal theme (default) */
                text-xl font-light tracking-widest text-text-primary hover:text-text-secondary transition-colors
                
                /* Artistic theme overrides */
                artistic:font-bold artistic:tracking-normal artistic:text-text-light artistic:hover:text-accent-2 artistic:transition-all artistic:hover:scale-105
            "
            >
                Anton Lechuga
            </a>

            <div class="hidden md:flex items-center space-x-8">
                {#each navItems.slice(1) as item}
                    <a
                        href={item.href}
                        class="
                            /* Minimal theme (default) */
                            font-normal tracking-wide text-text-secondary hover:text-text-primary transition-all duration-200 relative
                            
                            /* Artistic theme overrides */
                            artistic:font-medium artistic:tracking-normal artistic:text-text-light artistic:hover:text-accent-2 artistic:transition-all artistic:duration-300 artistic:hover:scale-110
                        "
                        class:text-text-primary={page.url.pathname ===
                            item.href}
                    >
                        {item.label}
                    </a>
                {/each}
                <button
                    type="button"
                    class="p-2 text-text-secondary hover:text-text-primary transition-colors duration-300 artistic:p-3 artistic:text-text-light artistic:hover:text-accent-2 artistic:bg-gradient-to-r artistic:from-primary-light artistic:to-secondary artistic:rounded-full artistic:shadow-md artistic:hover:shadow-lg artistic:transition-all artistic:hover:scale-110"
                    aria-label="Toggle theme"
                    onclick={toggleTheme}
                >
                    {#if currentTheme === 'artistic'}
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            >
                            </path>
                        </svg>
                    {:else}
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            >
                            </path>
                        </svg>
                    {/if}
                </button>
            </div>

            <div class="md:hidden flex items-center gap-2">
                <button
                    type="button"
                    class="p-2 text-text-secondary hover:text-text-primary transition-colors duration-300 artistic:p-3 artistic:text-text-light artistic:hover:text-accent-2 artistic:bg-gradient-to-r artistic:from-primary-light artistic:to-secondary artistic:rounded-full artistic:shadow-md artistic:hover:shadow-lg artistic:transition-all artistic:hover:scale-110"
                    aria-label="Toggle theme"
                    onclick={toggleTheme}
                >
                    {#if currentTheme === 'artistic'}
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            >
                            </path>
                        </svg>
                    {:else}
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            >
                            </path>
                        </svg>
                    {/if}
                </button>
                <button
                    bind:this={triggerElement}
                    onclick={toggleMobileMenu}
                    type="button"
                    class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-text-primary rounded-lg cursor-pointer artistic:text-text-light hover:bg-neutral-100 artistic:hover:bg-accent/20"
                    aria-label="Open menu"
                >
                    {currentNavItem.label}
                    <svg
                        class="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
            </div>
        </div>

        {#if isMobileMenuOpen}
            <div
                bind:this={dropdownElement}
                class="
                /* Default styles */
                absolute top-full right-0 bg-bg-primary shadow-md min-w-48 z-50 mt-2 rounded-lg overflow-hidden
                border border-neutral-700
                /* Artistic theme overrides */
                artistic:border-2 artistic:border-accent artistic:shadow-xl artistic:bg-gradient-to-b artistic:from-primary artistic:to-primary-dark
                /* Hide on desktop */
                md:hidden
                "
                transition:fly={{ y: -10, duration: 250 }}
            >
                {#each otherNavItems as item}
                    <a
                        href={item.href}
                        class="
                        /* Minimal theme (default) */
                        block px-6 py-4 text-sm font-normal tracking-wide text-text-secondary border-b border-neutral-700 last:border-b-0 hover:bg-neutral-800 hover:text-text-primary transition-all duration-200
                        /* Artistic theme overrides */
                        artistic:font-medium artistic:tracking-normal artistic:text-text-light artistic:border-b artistic:border-accent/30 artistic:last:border-b-0 artistic:hover:bg-accent/20 artistic:hover:text-accent-2
                        "
                        onclick={closeMobileMenu}
                    >
                        {item.label}
                    </a>
                {/each}
            </div>
        {/if}
    </nav>
</header>
