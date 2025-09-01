<script lang="ts">
    /**
     * FullBlog Component - Self-contained popup for blog posts
     *
     * Usage:
     * 1. Import: import FullBlog from "$lib/components/FullBlog.svelte";
     * 2. Add state: let selectedPost = $state<BlogPost | null>(null);
     * 3. Add function: function openFullBlog(post: BlogPost) { selectedPost = post; }
     * 4. Add component: <FullBlog post={selectedPost} />
     * 5. Pass onReadMore to BlogCard: <BlogCard {post} onReadMore={openFullBlog} />
     *
     * The component automatically opens when a post is provided and manages its own popup state.
     */
    import type { BlogPost } from '$lib/types'
    import { formatDate } from '$lib/utils'
    import { fade, slide } from 'svelte/transition'
    import { elasticOut } from 'svelte/easing'

    let { post } = $props<{
        post: BlogPost | null
    }>()

    // Internal popup state
    let isOpen = $state(false)

    // Expose open/close methods
    let open = $state(() => {
        isOpen = true
    })

    let close = $state(() => {
        isOpen = false
    })

    // Close modal when clicking outside
    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            close()
        }
    }

    // Close modal on escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            close()
        }
    }

    // Auto-open when post is provided
    $effect(() => {
        if (post) {
            isOpen = true
        }
    })
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && post}
    <!-- Backdrop with psychedelic backgrounds -->
    <div
        class="
            /* Minimal theme (default) */
            fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4
            
            /* Artistic theme overrides */
            artistic:bg-gradient-to-br artistic:from-primary/80 artistic:via-secondary/60 artistic:to-accent/80 artistic:bg-opacity-90 artistic:z-50 artistic:flex artistic:items-center artistic:justify-center artistic:p-4 artistic:relative artistic:overflow-hidden
        "
        onclick={handleBackdropClick}
        transition:fade={{ duration: 200 }}
    >
        <!-- Psychedelic background elements for artistic theme -->
        <div
            class="
            /* Minimal theme (default) */
            hidden
            
            /* Artistic theme overrides */
            artistic:absolute artistic:inset-0 artistic:opacity-30 artistic:animate-pulse
        "
        >
            <!-- Floating orbs -->
            <div
                class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-accent to-accent-2 rounded-full blur-xl animate-bounce"
            ></div>
            <div
                class="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-secondary to-primary rounded-full blur-xl animate-bounce"
                style="animation-delay: 1s;"
            ></div>
            <div
                class="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl animate-bounce"
                style="animation-delay: 2s;"
            ></div>

            <!-- Swirling patterns -->
            <div class="absolute top-0 left-0 w-full h-full">
                <div
                    class="absolute top-1/2 left-1/2 w-96 h-96 border-2 border-accent rounded-full opacity-20 animate-spin"
                ></div>
                <div
                    class="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-secondary rounded-full opacity-20 animate-spin"
                    style="animation-direction: reverse; animation-duration: 8s;"
                ></div>
                <div
                    class="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-primary rounded-full opacity-20 animate-spin"
                    style="animation-duration: 4s;"
                ></div>
            </div>
        </div>

        <!-- Modal Content -->
        <div
            class="
                /* Minimal theme (default) */
                bg-bg-primary border border-neutral-300 shadow-none max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10
                
                /* Artistic theme overrides */
                artistic:bg-gradient-to-br artistic:from-bg-secondary artistic:to-primary/5 artistic:border-2 artistic:border-accent artistic:shadow-2xl artistic:rounded-2xl artistic:backdrop-blur-sm artistic:bg-opacity-95 artistic:relative artistic:z-10 artistic:overflow-hidden
            "
            transition:slide={{ duration: 300, easing: elasticOut }}
        >
            <!-- Psychedelic border glow for artistic theme -->
            <div
                class="
                /* Minimal theme (default) */
                hidden
                
                /* Artistic theme overrides */
                artistic:absolute artistic:inset-0 artistic:rounded-2xl artistic:bg-gradient-to-r artistic:from-accent artistic:via-secondary artistic:to-primary artistic:opacity-20 artistic:animate-pulse artistic:-z-10
            "
            ></div>

            <!-- Header -->
            <div
                class="
                /* Minimal theme (default) */
                flex justify-between items-start p-6 border-b border-neutral-300
                
                /* Artistic theme overrides */
                artistic:flex artistic:justify-between artistic:items-start artistic:p-8 artistic:border-b-2 artistic:border-accent artistic:bg-gradient-to-r artistic:from-primary/10 artistic:to-secondary/10
            "
            >
                <div class="flex-1">
                    <h1
                        class="
                        /* Minimal theme (default) */
                        text-3xl font-normal text-text-primary mb-2
                        
                        /* Artistic theme overrides */
                        artistic:text-4xl artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:via-secondary artistic:to-accent artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
                    "
                    >
                        {post.title}
                    </h1>
                    <div
                        class="
                        /* Minimal theme (default) */
                        flex flex-wrap gap-2 mb-3
                        
                        /* Artistic theme overrides */
                        artistic:flex-wrap artistic:gap-2 artistic:mb-3
                    "
                    >
                        {#each post.labels as label}
                            <span
                                class="
                                /* Minimal theme (default) */
                                px-2 py-1 text-xs bg-transparent text-text-secondary border border-neutral-300
                                
                                /* Artistic theme overrides */
                                artistic:rounded-full artistic:bg-gradient-to-r artistic:from-accent artistic:to-accent-2 artistic:text-text-light artistic:border-transparent artistic:shadow-lg artistic:animate-pulse artistic:font-bold artistic:hover:scale-110 artistic:transition-all artistic:duration-300
                            "
                            >
                                {label}
                            </span>
                        {/each}
                    </div>
                    <p
                        class="
                        /* Minimal theme (default) */
                        text-sm font-light text-text-tertiary
                        
                        /* Artistic theme overrides */
                        artistic:font-normal artistic:text-secondary artistic:animate-pulse
                    "
                    >
                        {formatDate(post.creationDate)}
                    </p>
                </div>

                <!-- Close Button -->
                <button
                    onclick={close}
                    class="
                        /* Minimal theme (default) */
                        p-2 text-text-secondary hover:text-text-primary transition-colors duration-200
                        
                        /* Artistic theme overrides */
                        artistic:p-3 artistic:text-text-light artistic:hover:text-accent-2 artistic:transition-all artistic:duration-300 artistic:bg-gradient-to-r artistic:from-accent artistic:to-accent-2 artistic:rounded-full artistic:shadow-lg artistic:hover:shadow-xl artistic:hover:scale-110 artistic:animate-pulse
                    "
                    aria-label="Close"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>

            <!-- Content -->
            <div
                class="
                /* Minimal theme (default) */
                p-6
                
                /* Artistic theme overrides */
                artistic:p-8 artistic:bg-gradient-to-b artistic:from-transparent artistic:to-primary/5
            "
            >
                <!-- Featured Image -->
                {#if post.image}
                    <img
                        src={post.image}
                        alt={post.title}
                        class="
                            /* Minimal theme (default) */
                            w-full h-64 object-cover mb-6
                            
                            /* Artistic theme overrides */
                            artistic:w-full artistic:h-80 artistic:object-cover artistic:mb-8 artistic:rounded-2xl artistic:shadow-2xl artistic:border-2 artistic:border-accent artistic:animate-pulse
                        "
                    />
                {/if}

                <!-- Placeholder Content (for future markdown) -->
                <div
                    class="
                    /* Minimal theme (default) */
                    prose prose-neutral max-w-none
                    
                    /* Artistic theme overrides */
                    artistic:prose artistic:prose-neutral artistic:max-w-none
                "
                >
                    <p
                        class="
                        /* Minimal theme (default) */
                        text-lg font-light text-text-secondary leading-relaxed mb-6
                        
                        /* Artistic theme overrides */
                        artistic:text-lg artistic:font-normal artistic:text-text-secondary artistic:leading-relaxed artistic:mb-6 artistic:animate-pulse
                    "
                    >
                        This is a placeholder for the full blog post content. In
                        the future, this will be replaced with markdown content
                        loaded from the post file.
                    </p>

                    <p
                        class="
                        /* Minimal theme (default) */
                        text-base font-light text-text-secondary leading-relaxed mb-4
                        
                        /* Artistic theme overrides */
                        artistic:text-base artistic:font-normal artistic:text-text-secondary artistic:leading-relaxed artistic:mb-4 artistic:animate-pulse
                    "
                    >
                        The full content will be loaded from: <code
                            class="
                            /* Minimal theme (default) */
                            bg-neutral-200 px-2 py-1 rounded text-sm
                            
                            /* Artistic theme overrides */
                            artistic:bg-gradient-to-r artistic:from-accent artistic:to-accent-2 artistic:text-text-light artistic:px-3 artistic:py-2 artistic:rounded-lg artistic:text-sm artistic:font-bold artistic:shadow-lg
                        ">{post.post}</code
                        >
                    </p>

                    <p
                        class="
                        /* Minimal theme (default) */
                        text-base font-light text-text-secondary leading-relaxed
                        
                        /* Artistic theme overrides */
                        artistic:text-base artistic:font-normal artistic:text-text-secondary artistic:leading-relaxed artistic:animate-pulse
                    "
                    >
                        This popup provides a seamless reading experience while
                        keeping users on the current page. The modal can be
                        closed by clicking outside, pressing Escape, or clicking
                        the close button.
                    </p>
                </div>
            </div>
        </div>
    </div>
{/if}
