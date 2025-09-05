<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import BlogCard from './BlogCard.svelte'
    import {
        filterBlogPostsByLabel,
        filterBlogPostsByTitle,
        sortBlogPostsByDate,
    } from '$lib/utils'

    let {
        posts,
        className = '',
        onReadMore,
    } = $props<{
        posts: BlogPost[]
        onReadMore: (post: BlogPost) => void
        className?: string
    }>()

    let l = $derived(posts.length)

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
        /* Minimal theme (default) */
        flex flex-col sm:flex-row gap-4 items-start sm:items-center
        
        /* Artistic theme overrides */
      artistic:p-4 artistic:bg-gradient-to-r artistic:from-primary/10 artistic:to-secondary/10 artistic:rounded-xl artistic:border-2 artistic:border-accent/30 artistic:shadow-lg
   "
    >
        <!-- Search Input -->
        <div class="flex-1 min-w-0">
            <input
                type="text"
                placeholder="Search by title..."
                bind:value={searchTerm}
                class="
                    /* Minimal theme (default) */
                    w-full px-3 py-2 bg-transparent border border-neutral-300 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-text-primary transition-colors duration-200
                    
                    /* Artistic theme overrides */
                    artistic:bg-gradient-to-r artistic:from-bg-secondary artistic:to-primary/5 artistic:border-2 artistic:border-accent/50 artistic:rounded-lg artistic:focus:border-accent artistic:placeholder-text-secondary artistic:text-text-primary artistic:shadow-md artistic:focus:shadow-lg artistic:transition-all artistic:duration-300
               "
            />
        </div>

        <!-- Label Filter -->
        <select
            bind:value={selectedLabel}
            class="
                /* Minimal theme (default) */
                px-3 py-2 bg-transparent border border-neutral-300 text-text-primary focus:outline-none focus:border-text-primary transition-colors duration-200
                
                /* Artistic theme overrides */
                artistic:bg-gradient-to-r artistic:from-secondary/20 artistic:to-accent/20 artistic:border-2 artistic:border-secondary artistic:rounded-lg artistic:focus:border-accent artistic:text-text-primary artistic:shadow-md artistic:focus:shadow-lg artistic:transition-all artistic:duration-300
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
                /* Minimal theme (default) */
                px-3 py-2 bg-transparent border border-neutral-300 text-text-primary focus:outline-none focus:border-text-primary transition-colors duration-200
                
                /* Artistic theme overrides */
                artistic:bg-gradient-to-r artistic:from-accent/20 artistic:to-accent-2/20 artistic:border-2 artistic:border-accent artistic:rounded-lg artistic:focus:border-accent-2 artistic:text-text-primary artistic:shadow-md artistic:focus:shadow-lg artistic:transition-all artistic:duration-300
           "
        >
            ��       <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
        </select>
    </div>

    <!-- Results Count -->
    <div
        class="
        /* Minimal theme (default) */
        text-sm font-light text-text-secondary
        
        /* Artistic theme overrides */
        artistic:bg-gradient-to-r artistic:from-primary/10 artistic:to-secondary/10 artistic:px-4 artistic:py-2 artistic:rounded-lg artistic:border artistic:border-accent/30 artistic:shadow-md artistic:animate-pulse
   "
    >
        Showing {filteredPosts.length} of {posts.length} posts
    </div>

    <!-- Blog Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredPosts as post}
            <BlogCard {post} {onReadMore} />
        {/each}
    </div>

    <!-- No Results Message -->
    {#if filteredPosts.length === 0}
        <div class="text-center py-12 text-text-secondary">
            <p
                class="
                /* Minimal theme (default) */
                text-lg font-light
                
                /* Artistic theme overrides */
                artistic:font-normal
           "
            >
                No posts found matching your criteria.
            </p>
        </div>
    {/if}
</div>
