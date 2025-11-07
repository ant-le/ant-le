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
    bg-bg-primary py-6 border-b-0 top-0 sticky z-1000 transition-all duration-300
    artistic:text-text-light artistic:bg-accent-yellow artistic:border-b-2
    artistic:border-text-primary artistic:shadow-lg
"
>
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <button
                    onclick={() => (selectedNavItem = navItems[0])}
                    class={`relative pb-1 text-xl tracking-widest transition-colors duration-300
                    ${
                        isActive(navItems[0].value)
                            ? 'font-semibold'
                            : 'text-sm hover:border-text-text-primary'
                    }

                    `}
                    aria-current={isActive(navItems[0].value)
                        ? 'page'
                        : undefined}
                >
                    Anton Lechuga
                </button>
                <!-- drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] -->
            </div>

            <div class="flex items-center">
                <div class="hidden md:flex items-center gap-8">
                    {#each primaryNavItems as item}
                        <button
                            onclick={() => (selectedNavItem = item)}
                            class={`relative pb-1 text-md tracking-wide transition-all duration-300

                        ${
                            isActive(item.value)
                                ? 'font-semibold text-xl'
                                : 'font-normal hover:text-xl'
                        }
                        `}
                            aria-current={isActive(item.value)
                                ? 'page'
                                : undefined}
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
                    class="ml-2 md:ml-6 p-2 hover:text-text-primary transition-colors duration-300 hover:scale-105 artistic:text-white"
                    aria-label="Toggle theme"
                    onclick={toggleTheme}
                >
                    {#if currentTheme === 'artistic'}
                        <svg
                            class="w-7 h-7"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <title>Retro Acid Smile - No Outline</title>
                            <desc
                                >Gold (#FFD700) face with white eyes and mouth,
                                no outline.</desc
                            >
                            <defs>
                                <filter
                                    id="shadow"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                >
                                    <feDropShadow
                                        dx="0"
                                        dy="4"
                                        stdDeviation="4"
                                        flood-color="#000000"
                                        flood-opacity="0.25"
                                    />
                                </filter>
                            </defs>

                            <g filter="url(#shadow)">
                                <!-- Face -->
                                <circle
                                    cx="256"
                                    cy="256"
                                    r="220"
                                    fill="#FFFFFF"
                                />

                                <!-- Eyes (white vertical ovals) -->
                                <ellipse
                                    cx="190"
                                    cy="210"
                                    rx="22"
                                    ry="42"
                                    fill="#FFD700"
                                />
                                <ellipse
                                    cx="322"
                                    cy="210"
                                    rx="22"
                                    ry="42"
                                    fill="#FFD700"
                                />

                                <!-- Smile (white curve with rounded ends) -->
                                <path
                                    d="M128 302
             Q256 420 384 302"
                                    fill="none"
                                    stroke="#FFD700"
                                    stroke-width="26"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
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
