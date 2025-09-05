<script lang="ts">
    import { fly } from 'svelte/transition' // 1. Import the transition

    import { runningPBs } from '$lib/types/personalBests'
    import { runningTraining } from '$lib/types/running'
    import { filterBlogPostsByCategory } from '$lib/utils'

    import TrainingChart from '$lib/components/TrainingChart.svelte'
    import PersonalBest from '$lib/components/PersonalBest.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import PageHeader from '$lib/components/PageHeader.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import { blogPosts, type BlogPost } from '$lib/types/blog'
    import CardRasterHorizontal from '$lib/components/views/CardGallery.svelte'

    // Get running blog posts
    let posts = $derived(filterBlogPostsByCategory(blogPosts, 'running'))

    // FullBlog popup state
    let selectedPost = $state<BlogPost | null>(null)
    function onReadMore(post: BlogPost) {
        selectedPost = post
    }
</script>

<svelte:head>
    <title>Anton Lechuga | Running</title>
    <meta
        name="description"
        content="Running achievements and training by Anton Lechuga"
    />
</svelte:head>

<div class="flex flex-col mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader title="My Running Journey" className="lg:text-left" />

    <TextCard
        text="I enjoy running a lot since it allows me to be outside all by myself. Currently, while also pursuing personal bests, I am concentrating on getting to 100km weekly mileage. I would rather consider myself a long-distance runner, as I tend to enjoy longer runs more and I also seem to be better at them."
        classProps="text-center lg:text-left"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 my-12">
        <div class="lg:col-span-1 flex justify-center">
            <PersonalBest pbs={runningPBs} />
        </div>
        <div class="lg:col-span-2">
            <TrainingChart data={runningTraining} />
        </div>
    </div>

    <section class="flex flex-col gap-8">
        <TextCard
            text="At the beginning, I was very sceptical towards all the running gear you can find out there. Now, a couple of years later, I find myself using more than 3 shoes in parallel, thinking and researching running constantly. If you are interested in what I learned and what fascinated me the most, scroll down to have a look:"
            classProps="text-center lg:text-left"
        />
        <CardRasterHorizontal {posts} {onReadMore} />
    </section>
</div>

{#if selectedPost}
    <FullBlog post={selectedPost} />
{/if}
