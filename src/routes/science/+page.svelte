<script lang="ts">
    import { blogPosts } from '$lib/data'
    import { filterBlogPostsByCategory, getRandomBlogPosts } from '$lib/utils'
    import CardGridFull from '$lib/components/CardGridFull.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import type { BlogPost } from '$lib/types'
    import CardRasterHorizontal from '$lib/components/CardRasterHorizontal.svelte'
    import PageHeader from '$lib/components/PageHeader.svelte'
    import TextCard from '$lib/components/TextCard.svelte'

    // Get science blog posts
    let sciencePosts = $derived(filterBlogPostsByCategory(blogPosts, 'science'))

    // Get random 3 posts for initial view
    let randomPosts = $derived(getRandomBlogPosts(sciencePosts, 3))

    // FullBlog popup state - simplified
    let selectedPost = $state<BlogPost | null>(null)

    function openFullBlog(post: BlogPost) {
        selectedPost = post
    }
</script>

<svelte:head>
    <title>Anton Lechuga | Science</title>
    <meta
        name="description"
        content="Scientific research and thoughts by Anton Lechuga"
    />
</svelte:head>

<div
    class="
        /* Minimal theme (default) */
        max-w-6xl mx-auto px-4
        
        /* Artistic theme overrides */
        artistic:max-w-6xl
    "
>
    <!-- Initial View - Centered Text Blocks -->
    <PageHeader
        title="Science"
        subtitle="Exploring the frontiers of probabilistic discovery, causal inference, and AI systems."
    />

    <div
        class="
            /* Minimal theme (default) */
            flex flex-col justify-start pt-8
            
            /* Artistic theme overrides */
            artistic:flex artistic:flex-col artistic:justify-start artistic:pt-12
        "
    >
        <TextCard
            text="Exploring the frontiers of probabilistic discovery, causal inference, and AI systems."
        />

        <!-- Random Science Posts -->
        <CardRasterHorizontal
            title="Random Science Posts"
            posts={randomPosts}
            onReadMore={openFullBlog}
        />
    </div>

    <!-- Full Grid View - Revealed on Scroll -->
    <section
        class="
            /* Minimal theme (default) */
            py-12
            
            /* Artistic theme overrides */
            artistic:py-16
        "
    >
        <h2
            class="
                /* Minimal theme (default) */
                text-3xl font-normal text-text-primary mb-6 text-center
                
                /* Artistic theme overrides */
                artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
            "
        >
            All Science Posts
        </h2>
        <CardGridFull
            posts={sciencePosts}
            columns={3}
            onReadMore={openFullBlog}
        />
    </section>
</div>

<!-- FullBlog Popup - self-contained -->
<FullBlog post={selectedPost} />
