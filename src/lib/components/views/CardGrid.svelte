<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import BlogCard from '$lib/components/cards/BlogCard.svelte'
    import {
        filterBlogPostsByLabel,
        filterBlogPostsByTitle,
        sortBlogPostsByDate,
    } from '$lib/utils'
    import EmptyCard from '$lib/components/cards/EmptyCard.svelte'

    let {
        posts,
        className = '',
        onReadMore,
    } = $props<{
        posts: BlogPost[]
        onReadMore: (post: BlogPost) => void
        className?: string
    }>()

    // Filter and sort state
    let searchTerm = $state('')
    let selectedLabel = $state('')
    let sortOrder = $state<'newest' | 'oldest'>('newest')

    // Get all unique labels from posts
    let allLabels = $derived([
        ...new Set(posts.flatMap((post: BlogPost) => post.labels)),
    ])

    // Filter and sort posts
    let filteredPosts = $derived.by(() => {
        let filtered = posts

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filterBlogPostsByTitle(filtered, searchTerm.trim())
        }

        // Filter by label
        if (selectedLabel) {
            filtered = filterBlogPostsByLabel(filtered, selectedLabel)
        }

        // Sort by date
        filtered = sortBlogPostsByDate(filtered)
        if (sortOrder === 'oldest') {
            filtered = filtered.reverse()
        }

        return filtered
    })
</script>

<div class="space-y-6 {className}">
    <!-- Filter Controls -->
    <div
        class="
        flex flex-col sm:flex-row gap-4 items-start sm:items-center border border-bg-tertiary/60 bg-bg-secondary/70 p-4 backdrop-blur-sm transition-colors duration-300
        artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]
    "
    >
        <!-- Search Input -->
        <div class="flex-1 min-w-0">
            <input
                type="text"
                placeholder="Search by title..."
                bind:value={searchTerm}
                class="
                    w-full px-3 py-2 bg-bg-primary/80 border border-bg-tertiary/60 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary focus:bg-bg-primary transition-colors duration-200
                    artistic:bg-bg-primary artistic:text-text-primary artistic:placeholder:text-text-secondary artistic:border-4 artistic:border-text-primary artistic:focus:border-text-primary artistic:focus:bg-accent-pink
                "
            />
        </div>

        <!-- Label Filter -->
        <select
            bind:value={selectedLabel}
            class="
                px-3 py-2 border border-bg-tertiary/60 bg-bg-primary/80 text-text-primary focus:outline-none focus:border-text-primary transition-colors duration-300
                artistic:bg-accent-pink artistic:border-4 artistic:border-text-primary artistic:text-text-light artistic:focus:border-text-primary
            "
        >
            <option value="">All Labels</option>
            {#each allLabels as label}
                <option value={label}>{label}</option>
            {/each}
        </select>

        <!-- Sort Order -->
        <select
            bind:value={sortOrder}
            class="
                px-3 py-2 border border-bg-tertiary/60 bg-bg-primary/80 text-text-primary focus:outline-none focus:border-text-primary transition-colors duration-200
                artistic:bg-accent-cyan artistic:border-4 artistic:border-text-primary artistic:text-text-primary artistic:focus:border-text-primary
            "
        >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
        </select>
    </div>

    <!-- Results Count -->
    <div
        class="
        inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-normal text-text-secondary
        border-bg-tertiary/60 bg-bg-secondary/70 shadow-sm
        artistic:border-4 artistic:border-text-primary artistic:bg-accent-cyan artistic:shadow-[4px_4px_0px_rgba(0,0,0,1)] artistic:text-text-primary
    "
    >
        Showing {filteredPosts.length} of {posts.length} posts
    </div>

    <!-- Blog Cards Grid -->
    {#if filteredPosts.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredPosts as post}
                <BlogCard {post} {onReadMore} />
            {/each}
        </div>
    {:else}
        <div class="w-full flex justify-center">
            <div class="max-w-md w-full">
                <EmptyCard />
            </div>
        </div>
    {/if}
</div>
