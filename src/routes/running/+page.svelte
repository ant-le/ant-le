<script lang="ts">
    import { blogPosts, runningPBs, runningTraining } from '$lib/data'
    import { filterBlogPostsByCategory } from '$lib/utils'
    import TrainingChart from '$lib/components/TrainingChart.svelte'
    import PersonalBest from '$lib/components/PersonalBest.svelte'
    import BlogCard from '$lib/components/BlogCard.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import PageHeader from '$lib/components/PageHeader.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import type { BlogPost } from '$lib/types'

    // Get running blog posts
    let runningPosts = $derived(filterBlogPostsByCategory(blogPosts, 'running'))

    // FullBlog popup state - simplified
    let selectedPost = $state<BlogPost | null>(null)

    function openFullBlog(post: BlogPost) {
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
    class="
        /* Minimal theme (default) */
        max-w-6xl mx-auto px-4
        
        /* Artistic theme overrides */
        artistic:max-w-6xl
    "
>
    <PageHeader
        title="Running"
        subtitle="Personal bests, training insights, and the journey to sub-3 marathon."
        align="left"
    />

    <!-- Grid Layout: Left Side (Larger) + Right Side (Smaller) -->
    <div
        class="
            /* Minimal theme (default) */
            grid grid-cols-1 lg:grid-cols-5 gap-8
            
            /* Artistic theme overrides */
            artistic:grid-cols-1 artistic:lg:grid-cols-5 artistic:gap-12
        "
    >
        <!-- Left Side - Text Blocks + Horizontal Blog Scroll (Takes 3/5 of space) -->
        <div
            class="
                /* Minimal theme (default) */
                lg:col-span-3 space-y-8
                
                /* Artistic theme overrides */
                artistic:lg:col-span-3 artistic:space-y-10
            "
        >
            <!-- Text Blocks Section -->
            <section
                class="
                    /* Minimal theme (default) */
                    space-y-6
                    
                    /* Artistic theme overrides */
                    artistic:space-y-8
                "
            >
                <!-- Text Block 1 -->
                <TextCard
                    text="
                            Breaking the 3-hour marathon barrier has been a long-standing goal. Through systematic training, 
                            proper nutrition, and mental preparation, I'm working towards this ambitious target. The journey 
                            involves building endurance, improving running economy, and developing race-day strategies."
                />

                <TextCard
                    text="
                            My training approach combines high-mileage base building with targeted speed work. 
                            Long runs build endurance, tempo runs improve lactate threshold, and interval training 
                            enhances VO2 max. Recovery is prioritized through proper sleep, nutrition, and cross-training.
                        "
                />

                <TextCard
                    text="
                            Marathon success requires more than physical fitness. Mental preparation, pacing strategy, 
                            and nutrition planning are crucial. I focus on positive visualization, breaking the race 
                            into manageable segments, and maintaining focus during challenging moments.
                        "
                />
            </section>
            <!-- Horizontal Blog Posts Scroll -->
            <section
                class="
                    /* Minimal theme (default) */
                    space-y-4
                    
                    /* Artistic theme overrides */
                    artistic:space-y-6
                "
            >
                <h2
                    class="
                        /* Minimal theme (default) */
                        text-2xl font-normal text-text-primary mb-4
                        
                        /* Artistic theme overrides */
                        artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent
                    "
                >
                    Running Blog Posts
                </h2>
                <div
                    class="
                        /* Minimal theme (default) */
                        overflow-x-auto pb-4
                        
                        /* Artistic theme overrides */
                        artistic:overflow-x-auto artistic:pb-4
                    "
                >
                    <div
                        class="
                            /* Minimal theme (default) */
                            flex gap-4 min-w-max
                            
                            /* Artistic theme overrides */
                            artistic:flex artistic:gap-4 artistic:min-w-max
                        "
                    >
                        {#each runningPosts as post}
                            <div
                                class="
                                    /* Minimal theme (default) */
                                    w-80 flex-shrink-0
                                    
                                    /* Artistic theme overrides */
                                    artistic:w-80 artistic:flex-shrink-0
                                "
                            >
                                <BlogCard {post} onReadMore={openFullBlog} />
                            </div>
                        {/each}
                    </div>
                </div>
            </section>
        </div>

        <!-- Right Side - Two Smaller Sections (Takes 2/5 of space) -->
        <div
            class="
                /* Minimal theme (default) */
                lg:col-span-2 space-y-6
                
                /* Artistic theme overrides */
                artistic:lg:col-span-2 artistic:space-y-8
            "
        >
            <!-- Personal Bests Section -->
            <PersonalBest pbs={runningPBs} />

            <!-- Training Chart Section -->
            <TrainingChart data={runningTraining} />
        </div>
    </div>
</div>

<!-- FullBlog Popup - now self-contained -->
<FullBlog post={selectedPost} />
