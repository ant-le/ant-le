<script lang="ts">
    import type { MusicData } from '$lib/types/music'
    import type { BlogPost } from '$lib/types/blog'
    import type { FriendsData } from '$lib/types/friends'
    import BlogCard from './BlogCard.svelte'
    import FriendCard from './FriendCard.svelte'
    import MusicCard from './MusicCard.svelte'
    import RunningCard from './RunningCard.svelte'

    let {
        posts,
        title,
        onReadMore,
        className = '',
    } = $props<{
        // The array is now expected to be homogenous
        posts: BlogPost[] | FriendsData[] | MusicData[]
        onReadMore?: (post: BlogPost) => void
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

        //TODO: add workaround like this it is a bid annoying
        // Check for a unique property to identify the types type
        if ('categories' in firstPost) {
            if ('iframe' in firstPost) {
                return MusicCard
            }
            if (firstPost.categories.includes('running')) {
                return RunningCard
            }
            return BlogCard
        }
        // Default to FriendCard if the others don't match
        return FriendCard
    })

    const total = posts.length
</script>

<section class={className}>
    <div class="max-w-6xl mx-auto px-4 {className}">
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
                    class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none"
                ></div>

                <!-- Right gradient fade -->
                <div
                    class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none"
                ></div>

                <!-- Scrolling container. The main change is removing the gap and padding from here. -->
                <div class="flex overflow-x-auto pb-8 scrollbar-custom">
                    <!-- This new wrapper centers the content when it doesn't overflow -->
                    <div class="flex flex-none mx-auto px-4 gap-4">
                        {#each posts as post, index}
                            <CardComponent
                                {post}
                                {onReadMore}
                                {index}
                                {total}
                            />
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
