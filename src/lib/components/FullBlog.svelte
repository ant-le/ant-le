<script lang="ts">
    import type { BlogPost, BlogCategory } from '$lib/types/blog'
    import { formatDate } from '$lib/utils'
    import { fade, slide } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'

    let { post } = $props<{
        post: BlogPost | null
    }>()

    let isOpen = $state(false)

    let close = $state(() => {
        isOpen = false
    })

    // Helper to create the blog post URL from the filepath
    function getPostUrl(filePath: string): string {
        const fileName = filePath.split('/').pop() || ''
        const slug = fileName.replace('.md', '') // Remove .md extension
        return `/blog/${slug}`
    }

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            close()
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            close()
        }
    }

    $effect(() => {
        if (post) {
            isOpen = true
        }
    })
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && post}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
        onclick={handleBackdropClick}
        transition:fade={{ duration: 300 }}
        onkeydown={handleKeydown}
        role="button"
        tabindex="0"
    >
        <div
            class="relative flex w-full max-w-2xl flex-col overflow-hidden max-h-[90vh]
            rounded-2xl border border-bg-tertiary/70 bg-bg-secondary/95 text-text-primary shadow-2xl backdrop-blur-md transition-colors duration-300
            artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow artistic:text-text-light artistic:shadow-[12px_12px_0px_rgba(0,0,0,1)]"
            transition:slide={{
                duration: 400,
                easing: quintOut,
            }}
        >
            <div
                class="flex-shrink-0 items-start justify-between border-b border-bg-tertiary/60 p-6
                artistic:border-b-4 artistic:border-text-primary sm:flex"
            >
                <div class="flex-1">
                    <h1>
                        {post.title}
                    </h1>

                    <div class="mb-4 flex flex-wrap items-center gap-2">
                        {#each post.categories as category}
                            <span
                                class="rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider
                                border border-bg-tertiary/60 bg-bg-tertiary text-text-primary
                                artistic:border-4 artistic:border-text-primary artistic:bg-accent-pink artistic:text-text-light"
                            >
                                {category}
                            </span>
                        {/each}
                        {#each post.labels as label}
                            <span
                                class="rounded-full px-3 py-1 text-xs
                                border border-bg-tertiary/60 bg-bg-tertiary/70 text-text-primary
                                artistic:border-4 artistic:border-text-primary artistic:bg-bg-primary artistic:text-text-primary"
                            >
                                {label}
                            </span>
                        {/each}
                    </div>

                    <p class="text-sm font-normal text-text-secondary/80">
                        {formatDate(post.creationDate)}
                    </p>
                </div>
                <button
                    onclick={close}
                    class="ml-auto mt-2 rounded-full p-2 text-text-secondary transition-all duration-200 hover:bg-bg-tertiary/70 hover:text-text-primary artistic:hover:bg-accent-violet sm:ml-4 sm:mt-0"
                    aria-label="Close"
                >
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        >
                        </path>
                    </svg>
                </button>
            </div>

            <div class="flex flex-col gap-6 overflow-y-auto p-6">
                {#if post.image}
                    <img
                        src={post.image}
                        alt={post.title}
                        class="mb-6 h-auto w-full max-h-80 rounded-2xl border border-bg-tertiary/50 object-cover shadow-lg
                        artistic:border-4 artistic:border-text-primary artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                    />
                {/if}

                <div>
                    <h2>tl;dr</h2>
                    <p class="text-text-secondary artistic:text-text-light">
                        {post.desc}
                    </p>
                </div>

                <button
                    class="block w-full rounded-lg bg-accent-orange p-4 text-center font-semibold text-text-primary transition-transform duration-200 hover:scale-[1.02]
                    artistic:bg-accent-pink artistic:text-text-light artistic:border-4 artistic:border-text-primary artistic:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                    disabled
                    >Read Full Post →
                </button>
            </div>
        </div>
    </div>
{/if}
