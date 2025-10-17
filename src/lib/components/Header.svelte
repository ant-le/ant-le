<script lang="ts">
    import { page } from '$app/state'
    import { goto } from '$app/navigation'
    import type { Theme, NavItem } from '$lib/types/types'
    import Dropdown from './Dropdown.svelte'
    import { resolve } from '$app/paths'

    let { toggleTheme, currentTheme } = $props<{
        toggleTheme: () => void
        currentTheme: Theme
    }>()

    const navItems: NavItem[] = [
        { value: resolve('/'), label: 'Home' },
        { value: resolve('/science'), label: 'Science' },
        { value: resolve('/running'), label: 'Running' },
        { value: resolve('/music'), label: 'Music' },
        { value: resolve('/about'), label: 'About' },
    ]

    const primaryNavItems = navItems.slice(1)

    let selectedNavItem: NavItem = $derived(
        navItems.find((item) => item.value === page.url.pathname) || navItems[0]
    )

    let otherNavItems: NavItem[] = $derived(
        navItems.filter((item) => item.value !== selectedNavItem.value)
    )

    $effect(() => {
        if (selectedNavItem.value !== page.url.pathname) {
            goto(selectedNavItem.value)
        }
    })

    const isActive = (value: string) => selectedNavItem.value === value
</script>

<header
    class="
    bg-bg-primary py-6 border-b-0 top-0 sticky z-1000
    artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:border-b-2 artistic:border-accent artistic:transition-all artistic:duration-300 artistic:shadow-lg
"
>
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <button
                    onclick={() => (selectedNavItem = navItems[0])}
                    class={`relative pb-1 text-xl tracking-widest transition-colors duration-300 text-text-light
                        ${isActive(navItems[0].value)
                            ? ''
                            : 'font-light hover:border-text-text-light'}
                    `}
                    aria-current={isActive(navItems[0].value) ? 'page' : undefined}
                >
                    Anton Lechuga
                </button>
            </div>

            <div class="flex items-center">
                <div class="hidden md:flex items-center gap-8">
                    {#each primaryNavItems as item}
                        <button
                            onclick={() => (selectedNavItem = item)}
                            class={`relative pb-1 text-md tracking-wide transition-all duration-300 border-b-2 border-transparent
                                ${isActive(item.value)
                                    ? 'font-semibold text-text-primary border-current'
                                    : 'font-light text-text-secondary hover:text-text-primary hover:border-text-secondary artistic:text-text-light artistic:hover:text-text-primary'}
                            `}
                            aria-current={isActive(item.value) ? 'page' : undefined}
                        >
                            {item.label}
                        </button>
                    {/each}
                </div>

                <div class="md:hidden">
                    <Dropdown
                        options={otherNavItems}
                        bind:selectedValue={selectedNavItem}
                        position="left"
                    />
                </div>

                <button
                    type="button"
                    class="ml-2 md:ml-6 p-2 text-text-secondary hover:text-text-primary transition-colors duration-300 hover:scale-105 artistic:text-white"
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
        </div>
    </nav>
</header>
