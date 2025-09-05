<script lang="ts">
    import type { MusicData } from '$lib/types/music'
    import type { BlogPost } from '$lib/types/blog'
    import type { FriendsData } from '$lib/types/friends'
    import BlogCard from '$lib/components/cards/BlogCard.svelte'
    import FriendCard from '$lib/components/cards/FriendCard.svelte'
    import MusicCard from '$lib/components/cards/MusicCard.svelte'
    import RunningCard from '$lib/components/cards/RunningCard.svelte'
    import EmptyCard from '$lib/components/cards/EmptyCard.svelte'

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

        <div class="relative overflow-hidden">
            <div class="flex overflow-x-auto pb-8 scrollbar-custom">
                {#if posts && posts.length > 0}
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
                {:else}
                    <div class="w-full flex items-center justify-center">
                        <div class="max-w-md w-full">
                            <EmptyCard />
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</section>
