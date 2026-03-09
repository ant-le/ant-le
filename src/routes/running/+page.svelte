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

<div
    class="flex flex-col py-8 artistic:py-12 artistic:border-x-4 artistic:border-text-primary"
>
    <section
        class="grid grid-cols-1 artistic:border-b-4 artistic:border-text-primary lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]"
    >
        <div
            class="order-2 col-span-1 bg-bg-secondary p-8 md:p-12 lg:order-1 lg:p-16 artistic:bg-accent-orange"
        >
            <div
                class="mb-6 space-y-2 border-b border-bg-tertiary/60 pb-6 artistic:border-b-4 artistic:border-text-primary"
            >
                <h2 class="artistic:text-text-primary">Running</h2>
                <p
                    class="text-sm uppercase tracking-[0.2em] artistic:text-text-primary"
                >
                    Long distance / weekly volume / steady progress
                </p>
            </div>
            <TextCard
                text="I enjoy running a lot since it allows me to be outside all by myself. Currently, while also pursuing personal bests, I am concentrating on getting to 100km weekly mileage. I would rather consider myself a long-distance runner, as I tend to enjoy longer runs more and I also seem to be better at them."
                classProps="text-center lg:text-left"
            />
            <TextCard
                text="I am planning to improve on my <strong>10k</strong>-time over the course of this training period. The goal is to reach times below <strong>36:00</strong> to build up some tempo. Over the course of the next year, I want to extend the distances up to a Half-Marathon to see what is possible!"
                classProps="text-center lg:text-left"
            />
        </div>
        <div
            class="order-1 col-span-1 border-b border-bg-tertiary/60 bg-bg-primary p-6 md:p-8 lg:order-2 lg:border-b-0 lg:border-l artistic:border-text-primary artistic:bg-accent-yellow lg:artistic:border-l-4"
        >
            <PersonalBest
                pbs={runningPBs}
                className="h-full artistic:bg-transparent artistic:border-0 artistic:shadow-none p-0 md:p-0"
            />
        </div>
    </section>

    <section
        class="grid grid-cols-1 gap-0 artistic:border-b-4 artistic:border-text-primary lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]"
    >
        <div class="col-span-1 bg-bg-primary p-0">
            <TrainingChart
                data={runningTraining}
                className="artistic:border-0 artistic:shadow-none"
            />
        </div>
        <div
            class="col-span-1 flex items-center border-t border-bg-tertiary/60 bg-bg-secondary p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-16 artistic:border-text-primary artistic:bg-bg-secondary lg:artistic:border-l-4"
        >
            <TextCard
                text="At the beginning, I was very sceptical towards all the running gear you can find out there. Now, a couple of years later, I find myself using more than 3 shoes in parallel, thinking and researching running constantly. If you are interested in what I learned and what fascinated me the most, scroll down to have a look:"
                classProps="text-center lg:text-left"
            />
        </div>
    </section>

    <section class="py-12 artistic:py-16 bg-bg-secondary">
        <CardGallery {posts} {onReadMore} />
    </section>
</div>

{#if selectedPost}
    <FullBlog post={selectedPost} />
{/if}
