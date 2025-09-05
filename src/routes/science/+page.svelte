<script lang="ts">
    import { fly } from 'svelte/transition'
    import { blogPosts } from '$lib/types/blog'
    import {
        filterBlogPostsByCategory,
        filterBlogPostsByLabel,
        getRandomBlogPosts,
    } from '$lib/utils'
    import CardGridFull from '$lib/components/CardGridFull.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import PageHeader from '$lib/components/PageHeader.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import BlogCard from '$lib/components/BlogCard.svelte'
    import { type RandomPosts } from '$lib/types/types'
    import { type BlogPost } from '$lib/types/blog'

    // --- Main post lists ---
    const sciencePosts = $derived(
        filterBlogPostsByCategory(blogPosts, 'science')
    )
    const philosophyPosts = $derived(
        filterBlogPostsByLabel(blogPosts, 'philosophy')
    )
    const mathPosts = $derived(filterBlogPostsByLabel(blogPosts, 'math'))
    const socialSciencePosts = $derived(
        filterBlogPostsByLabel(blogPosts, 'social science')
    )

    // --- State for three random posts ---
    let randomPosts: RandomPosts = $state({
        philosophy: null as BlogPost | null,
        'social science': null as BlogPost | null,
        math: null as BlogPost | null,
    })

    // --- Function to select new random posts ---
    function reshufflePosts() {
        randomPosts.philosophy = getRandomBlogPosts(philosophyPosts, 1)[0]
        randomPosts['social science'] = getRandomBlogPosts(
            socialSciencePosts,
            1
        )[0]
        randomPosts.math = getRandomBlogPosts(mathPosts, 1)[0]
    }

    // --- Initial load of random posts ---
    $effect(() => {
        reshufflePosts()
    })

    // --- FullBlog popup state ---
    let selectedPost = $state<BlogPost | null>(null)
    function onReadMore(post: BlogPost) {
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

<div class="flex flex-col gap-12 mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader title="Science" />

    <blockquote
        class="text-xl italic font-semibold text-center text-text-tertiary max-w-3xl mx-auto"
    >
        <p class="text-text-secondary">
            "Normal science, the activity in which most scientists inevitably
            spend almost all their time, is predicated on the assumption that
            the scientific community knows what the world is like"
        </p>
        <p>Thomas Kuhn</p>
    </blockquote>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextCard
            text="Over the past years, I got to know many academic subjects. I wouldn't call myself an expert on any of them - at least so far. Having a backgound in social (political) science and applied statistics, I explored parts of philosophy, math and computer science. I am now graduating in data science, but many of the other subjects still have touching points with what I do."
        />
        <TextCard
            text="Over the past years, I accumalated many sheets, markdowns, youtube videos, books, articles about fascinating science facts. I have planned many times to collect these, but haven't done so far. For that reason, I introduced this block and I hope that you will find some inspiration :) - Down below, you find some selected peaces and scroll down for the full view. Enjoy!"
        />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {#each Object.entries(randomPosts) as [title, post]}
            {#if post}
                <div class="flex flex-col gap-3">
                    <h3
                        class="text-lg font-bold text-text-secondary text-center"
                    >
                        From {title}
                    </h3>
                    <BlogCard {post} {onReadMore} />
                </div>
            {/if}
        {/each}
    </div>

    <section>
        <div class="mt-8 mb-8">
            <h2
                class="
                    text-3xl text-text-primary mb-8
                    artistic:font-bold artistic:text-center artistic:mb-12 artistic:pt-10
                "
            >
                All Science-related posts
            </h2>
            <TextCard
                text="In the hope of writing many stories on science, here you can find all science posts with some selection tools:"
            />
        </div>

        <CardGridFull posts={sciencePosts} {onReadMore} />
    </section>
</div>

<FullBlog post={selectedPost} />
