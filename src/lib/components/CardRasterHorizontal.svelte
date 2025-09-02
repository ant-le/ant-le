<script lang="ts">
    import type { BlogPost, FriendsData } from '$lib/types'
    import BlogCard from './BlogCard.svelte'
    import FriendCard from './FriendCard.svelte'

    let {
        posts,
        title,
        className = '',
        onReadMore,
    } = $props<{
        posts: BlogPost[] | FriendsData[]
        title?: string
        className?: string
        onReadMore?: (post: BlogPost) => void
    }>()

    // Helper function to check if an item is a BlogPost
    function isBlogPost(item: BlogPost | FriendsData): item is BlogPost {
        return 'categories' in item
    }
</script>

<section class={className}>
    <div
        class="
        /* Minimal theme (default) */
        max-w-6xl mx-auto px-4 bg-bg-primary rounded-xl shadow-inner
        
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

        <div class="relative overflow-hidden">
            <div
                class="
                absolute left-0 top-0 bottom-0 w-12
                bg-gradient-to-r from-bg-primary to-transparent
                z-10 pointer-events-none
                
                artistic:from-bg-secondary
                "
            ></div>

            <div
                class="
                absolute right-0 top-0 bottom-0 w-12
                bg-gradient-to-l from-bg-primary to-transparent
                z-10 pointer-events-none
                
                artistic:from-bg-secondary
                "
            ></div>

            <div
                class="flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 scrollbar-custom"
            >
                {#each posts as post}
                    <div
                        class="
                        flex-shrink-0
                        "
                    >
                        {#if isBlogPost(post)}
                            <BlogCard {post} {onReadMore} />
                        {:else}
                            <FriendCard friend={post} />
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
