<script lang="ts">
    import { blogPosts } from '$lib/types/blog'
    import {
        filterBlogPostsByCategory,
        createRandomPostsByLabels,
    } from '$lib/utils'
    import CardGridFull from '$lib/components/views/CardGrid.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import BlogCard from '$lib/components/cards/BlogCard.svelte'
    import { type RandomPosts } from '$lib/types/types'
    import { type BlogPost } from '$lib/types/blog'
    import EmptyCard from '$lib/components/cards/EmptyCard.svelte'
    import Divider from '$lib/components/Divider.svelte'

    // --- Main post lists ---
    const sciencePosts = $derived(
        filterBlogPostsByCategory(blogPosts, 'science')
    )

    // --- State for three random posts ---
    let randomPosts: RandomPosts = $state({})
    const labels = ['philosophy', 'mathematics', 'social science']
    $effect(() => {
        randomPosts = createRandomPostsByLabels(sciencePosts, labels)
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

<div class="flex flex-col gap-12 pt-12 bg-accent-cyan/20 border-x">
    <div
        class="bg-bg-secondary p-12 max-w-7xl mx-auto backdrop-blur-sm border border-text-secondary"
    >
        <blockquote
            class="text-xl font-semibold
            w-full text-center text-text-secondary max-w-3xl m-auto"
        >
            "Normal science, the activity in which most scientists inevitably
            spend almost all their time, is predicated on the assumption that
            the scientific community knows what the world is like"
            <h4>Thomas Kuhn</h4>
        </blockquote>
    </div>
    <div class="px-8 pt-8 pb-18 backdrop-blur-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextCard
                text="Over the past years, I got to know many academic subjects. I wouldn't call myself an expert on any of them - at least so far. Having a backgound in social (political) science and applied statistics, I explored parts of philosophy, math and computer science. I am now graduating in data science, but many of the other subjects still have touching points with what I do."
            />
            <TextCard
                text="Over the past years, I accumalated many sheets, markdowns, youtube videos, books, articles about fascinating science facts. I have planned many times to collect these, but haven't done so far. For that reason, I introduced this block and I hope that you will find some inspiration :) - Down below, you find some selected peaces and scroll down for the full view. Enjoy!"
            />
        </div>
        <div class="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {#each Object.entries(randomPosts) as [title, post]}
                <div
                    class="flex h-full flex-col gap-4 mt-12 border-t border-text-secondary/30 p-4 transition-colors duration-300 hover:border-accent-yellow"
                >
                    <h4>
                        From {title}
                    </h4>
                    {#if post}
                        <div class="h-full">
                            <BlogCard {post} {onReadMore} />
                        </div>
                    {:else}
                        <div class="p-4 h-full">
                            <EmptyCard
                                title="Nothing"
                                message="I did not find the time to write anyting on this subject :/"
                            />
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <Divider />
    <section class="p-8 mt-5">
        <h2>All Science-related posts</h2>
        <TextCard
            text="In the hope of writing many stories on science, here you can find all science posts with some selection tools:"
        />

        <CardGridFull posts={sciencePosts} {onReadMore} />
    </section>
</div>

<FullBlog post={selectedPost} />
