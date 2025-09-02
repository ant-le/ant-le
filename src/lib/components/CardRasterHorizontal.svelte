<script lang="ts">
    import type { BlogPost, FriendsData, MusicData } from '$lib/types'
    import BlogCard from './BlogCard.svelte'
    import FriendCard from './FriendCard.svelte'
    import MusicCard from './MusicCard.svelte'

    let {
        posts,
        title,
        className = '',
    } = $props<{
        // The array is now expected to be homogenous
        posts: BlogPost[] | FriendsData[] | MusicData[]
        title?: string
        className?: string
    }>()

    // Determine the single component to use for the entire array based on the first item.
    // This is more efficient as it only runs once.
    const CardComponent = $derived.by(() => {
        if (!posts || posts.length === 0) {
            return null
        }
        const firstPost = posts[0]

        // Check for a unique property to identify the data type
        if ('categories' in firstPost) {
            return BlogCard
        }
        if ('iframe' in firstPost) {
            return MusicCard
        }
        // Default to FriendCard if the others don't match
        return FriendCard
    })
</script>

<section class={className}>
    <div
        class="
        /* Minimal theme (default) */
        max-w-6xl mx-auto px-4
        
        /* Artistic theme overrides */
        artistic:max-w-6xl artistic:bg-bg-secondary artistic:rounded-2xl artistic:shadow-xl
        {className}
    "
    >
        {#if title}
            <h2
                class="
            /* Minimal theme (default) */
            text-3xl font-normal text-text-primary mb-8 pt-8
            
            /* Artistic theme overrides */
            artistic:font-bold artistic:text-center artistic:mb-12 artistic:pt-10
        "
            >
                {title}
            </h2>
        {/if}

        {#if posts && posts.length > 0 && CardComponent}
            <div class="relative overflow-hidden">
                <!-- Left gradient fade -->
                <div
                    class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none artistic:from-bg-secondary"
                ></div>

                <!-- Right gradient fade -->
                <div
                    class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none artistic:from-bg-secondary"
                ></div>

                <!-- Scrolling container. The main change is removing the gap and padding from here. -->
                <div class="flex overflow-x-auto pb-8 scrollbar-custom">
                    <!-- This new wrapper centers the content when it doesn't overflow -->
                    <div class="flex flex-none mx-auto px-4 gap-6">
                        {#each posts as post}
                            <div class="flex-shrink-0 w-80">
                                <CardComponent {post} />
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {:else}
            <!-- Empty state message -->
            <div
                class="flex flex-col items-center justify-center text-center py-16 px-4"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-12 w-12 text-text-secondary mb-4"
                >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>

                <h3 class="text-xl font-semibold text-text-primary">
                    No Posts Available
                </h3>
                <p class="text-text-secondary mt-2">
                    There's nothing to see here at the moment. Please check back
                    later!
                </p>
            </div>
        {/if}
    </div>
</section>
