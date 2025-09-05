<script lang="ts">
    import { fly } from 'svelte/transition'
    import type { NavItem } from '$lib/types/types'

    let {
        options,
        selectedValue = $bindable(),
        triggerLabel,
        className = '',
        position = 'left',
    } = $props<{
        options: NavItem[]
        selectedValue: NavItem
        triggerLabel?: string
        className?: string
        position?: 'bottom' | 'top' | 'left' | 'right'
    }>()

    // Position classes for dropdown
    const positionClasses: Record<'bottom' | 'top' | 'left' | 'right', string> =
        {
            bottom: 'top-full left-0 mt-2',
            top: 'bottom-full left-0 mb-2',
            left: 'top-0 right-full mr-2',
            right: 'top-0 left-full ml-2',
        }

    // Ensure position is properly typed for indexing
    const currentPosition = position as keyof typeof positionClasses
    let buttonText: string = $derived(triggerLabel ?? selectedValue.label)
    let isOpen = $state(false)

    let dropdownElement: HTMLDivElement
    let triggerElement: HTMLButtonElement

    $effect(() => {
        if (!isOpen) {
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
                isOpen = false
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    })
</script>

<div class="relative {className}">
    <!-- Trigger Button -->
    <button
        onclick={() => (isOpen = !isOpen)}
        bind:this={triggerElement}
        class="inline-flex items-center gap-1 text-sm text-text-secondary artistic:text-text-tertiary hover:text-text-primary artistic:hover:text-text-primary transition-colors px-3 py-2 rounded-l artistic:hover:bg-primary/10"
        type="button"
    >
        {buttonText}
        <svg
            class="w-2 h-2"
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

    <!-- Dropdown Menu -->
    {#if isOpen}
        <div
            bind:this={dropdownElement}
            class="absolute z-10 {positionClasses[
                currentPosition
            ]} min-w-25 bg-bg-primary shadow-lg rounded-lg overflow-hidden border border-neutral-300 artistic:border-accent/20 artistic:bg-gradient-to-b artistic:from-primary artistic:to-primary-dark artistic:shadow-xl"
            transition:fly={{
                y: position === 'bottom' ? -10 : 10,
                duration: 250,
            }}
        >
            <ul
                class="py-2 text-sm divide-y divide-neutral-100 artistic:divide-accent/20"
            >
                {#each options as option}
                    <li>
                        <button
                            onclick={() => {
                                selectedValue = option
                                isOpen = false
                            }}
                            class="block w-full text-left px-4 py-2 text-sm font-normal tracking-wide text-text-secondary hover:text-text-primary transition-all duration-200 artistic:text-text-light artistic:hover:bg-accent/20 artistic:hover:text-accent-2 first:rounded-t-lg last:rounded-b-lg"
                        >
                            {option.label}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
