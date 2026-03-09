<script lang="ts">
    import { musicPosts } from '$lib/types/music'
    import CardRasterHorizontal from '$lib/components/views/CardGallery.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import type { BlogPost } from '$lib/types/blog'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import Divider from '$lib/components/Divider.svelte'

    // --- FullBlog popup state ---
    let selectedPost = $state<BlogPost | null>(null)
    function onReadMore(post: BlogPost) {
        selectedPost = post
    }
</script>

<svelte:head>
    <title>Anton Lechuga | Music</title>
    <meta
        name="description"
        content="Music projects and DJ sets by Anton Lechuga"
    />
</svelte:head>

<div class="flex flex-col artistic:border-x-4 artistic:border-text-primary">
    <!-- Intro -->
    <div
        class="px-8 py-12 md:px-16 md:py-16 lg:px-24 lg:py-20 bg-bg-secondary text-center"
    >
        <TextCard
            text="To me, music is one of the greatest joys and inspirations in life. I am an amateur DJ and am currently trying to get into music production with synthesisers, a mic and some flutes. I want to share some music and artists I love and (hopefully) some of my own makings soon!"
            classProps="max-w-3xl mx-auto text-center"
        />
    </div>

    <Divider />

    <!-- Listening section -->
    <section
        class="px-8 py-12 md:px-16 md:py-16 lg:px-24 lg:py-20 text-center space-y-10"
    >
        <h2>What I am listen to at the moment:</h2>
        <CardRasterHorizontal posts={musicPosts} {onReadMore} />
    </section>

    <Divider />

    <!-- Coming Soon -->
    <section class="px-8 py-12 md:px-16 md:py-16 lg:px-24 lg:py-20 text-center">
        <h2>Coming Soon:</h2>
        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10 max-w-4xl mx-auto"
        >
            <TextCard
                text="Techno and downtempo mixes with emotional touch and energy."
                title="DJ Sets"
                classProps="border border-bg-tertiary/60 bg-bg-secondary/80 p-8 md:p-10 shadow-lg transition-shadow duration-300 hover:shadow-xl backdrop-blur-sm artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            />
            <TextCard
                text="Compositions and experimental sound design projects."
                title="Music Production"
                classProps="border border-bg-tertiary/60 bg-bg-secondary/80 p-8 md:p-10 shadow-lg transition-shadow duration-300 hover:shadow-xl backdrop-blur-sm artistic:border-4 artistic:border-text-primary artistic:bg-accent-violet artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            />
        </div>
    </section>
</div>

<FullBlog post={selectedPost} />
