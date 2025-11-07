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

<div class="grid grid-cols-3 h-full">
    <div class="col-span-2 border-r p-8">
        <TextCard
            text="To me, music is one of the greatest joys and inspirations in life. I am an amateur DJ and am currently trying to get into music production with synthesisers, a mic and some flutes. I want to share some music and artists I love and (hopefully) some of my own makings soon!"
            classProps="text-center"
        />

        <Divider />
        <section class="text-center space-y-6 lg:col-span-2">
            <h2>What I am listen to at the moment:</h2>
            <div class="md:p-6">
                <CardRasterHorizontal posts={musicPosts} {onReadMore} />
            </div>
        </section>
        <Divider />
    </div>

    <section class="text-center p-8 col-span-1">
        <h2>Coming Soon:</h2>
        <div class="flex mt-8 flex-col gap-8">
            <TextCard
                text="Techno and downtempo mixes with emotional touch and energy."
                title="DJ Sets"
                classProps="border border-bg-tertiary/60 bg-bg-secondary/80 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl backdrop-blur-sm artistic:border-text-primary artistic:bg-accent-yellow/45 artistic:shadow-[0_12px_32px_rgba(0,0,0,0.32)]"
            />
            <TextCard
                text="Compositions and experimental sound design projects."
                title="Music Production"
                classProps="border border-bg-tertiary/60 bg-bg-secondary/80 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl backdrop-blur-sm artistic:border-text-primary artistic:bg-accent-violet/45 artistic:shadow-[0_12px_32px_rgba(0,0,0,0.32)]"
            />
        </div>
    </section>
</div>

<FullBlog post={selectedPost} />
