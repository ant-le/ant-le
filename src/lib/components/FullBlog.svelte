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
            bg-bg-primary border border-neutral-300 shadow-xl rounded-xl
            artistic:rounded-2xl artistic:border-2 artistic:border-accent/20 artistic:shadow-2xl"
            transition:slide={{
                duration: 400,
                easing: quintOut,
            }}
        >
            <div
                class="flex-shrink-0 items-start justify-between border-b border-neutral-200 p-6
                artistic:border-accent/20 sm:flex"
            >
                <div class="flex-1">
                    <h1
                        class="mb-3 text-2xl font-bold text-text-primary artistic:text-3xl"
                    >
                        {post.title}
                    </h1>

                    <div class="mb-4 flex flex-wrap items-center gap-2">
                        {#each post.categories as category}
                            <span
                                class="rounded-md px-3 py-1 text-bg-primary text-xs font-bold uppercase tracking-wider
                                bg-neutral-200 border border-neutral-300
                                artistic:border-primary/30 artistic:bg-primary/10 artistic:text-primary"
                            >
                                {category}
                            </span>
                        {/each}
                        {#each post.labels as label}
                            <span
                                class="rounded-full px-3 py-1 text-xs
                                bg-neutral-100 text-bg-primary border border-neutral-300
                                artistic:border-accent/30 artistic:bg-accent/10 artistic:text-accent"
                            >
                                {label}
                            </span>
                        {/each}
                    </div>

                    <p class="text-sm font-light text-text-tertiary">
                        {formatDate(post.creationDate)}
                    </p>
                </div>
                <button
                    onclick={close}
                    class="ml-auto mt-2 rounded-full p-2 text-text-secondary transition-all duration-200 hover:bg-neutral-200 hover:text-text-primary artistic:hover:bg-accent/20 sm:ml-4 sm:mt-0"
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
                        class="mb-6 h-auto w-full max-h-80 rounded-xl object-cover shadow-md
                        artistic:rounded-2xl artistic:border artistic:border-accent/20 artistic:shadow-lg"
                    />
                {/if}

                <div>
                    <h2
                        class="mb-2 text-sm font-bold uppercase tracking-widest text-text-tertiary artistic:text-accent"
                    >
                        tl;dr
                    </h2>
                    <p class="text-text-secondary artistic:text-text-light">
                        {post.desc}
                    </p>
                </div>

                <button
                    class="block w-full rounded-lg bg-text-primary p-4 text-center font-bold text-bg-primary transition-transform duration-200 hover:scale-[1.02]
                    artistic:bg-gradient-to-r artistic:from-primary artistic:to-accent artistic:text-text-light"
                    disabled
                    >Read Full Post →
                </button>
            </div>
        </div>
    </div>
{/if}
