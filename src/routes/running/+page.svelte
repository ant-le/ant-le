<script lang="ts">
    import { runningPBs } from '$lib/types/personalBests'
    import { runningTraining } from '$lib/types/running'
    import { filterBlogPostsByCategory } from '$lib/utils'

    import TrainingChart from '$lib/components/TrainingChart.svelte'
    import PersonalBest from '$lib/components/PersonalBest.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import { blogPosts, type BlogPost } from '$lib/types/blog'
    import CardGallery from '$lib/components/views/CardGallery.svelte'
    import Divider from '$lib/components/Divider.svelte'

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

<div class="flex flex-col artistic:border-x">
    <div class="grid grid-cols-3">
        <div class="col-span-2 p-12 bg-bg-secondary">
            <TextCard
                text="I enjoy running a lot since it allows me to be outside all by myself. Currently, while also pursuing personal bests, I am concentrating on getting to 100km weekly mileage. I would rather consider myself a long-distance runner, as I tend to enjoy longer runs more and I also seem to be better at them."
                classProps="text-center lg:text-left"
            />
            <TextCard
                text="I am planning to improve on my <strong>10k</strong>-time over the course of this training period. The goal is to reach times below <strong>36:00</strong> to build up some tempo. Over the course of the next year, I want to extend the distances up to a Half-Marathon to see what is possible!"
                classProps="text-center lg:text-left"
            />
        </div>
        <div class="col-span-1">
            <PersonalBest pbs={runningPBs} />
        </div>
    </div>

    <div class="grid grid-cols-3 border-b">
        <div class="col-span-2">
            <TrainingChart data={runningTraining} />
        </div>
        <div class="col-span-1 p-12 bg-bg-secondary">
            <TextCard
                text="At the beginning, I was very sceptical towards all the running gear you can find out there. Now, a couple of years later, I find myself using more than 3 shoes in parallel, thinking and researching running constantly. If you are interested in what I learned and what fascinated me the most, scroll down to have a look:"
                classProps="text-center lg:text-left"
            />
        </div>
    </div>
    <section class="mt-12">
        <CardGallery {posts} {onReadMore} />
    </section>
</div>

{#if selectedPost}
    <FullBlog post={selectedPost} />
{/if}
