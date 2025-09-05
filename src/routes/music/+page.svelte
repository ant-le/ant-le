<script lang="ts">
    import { musicPosts } from '$lib/types/music'
    import CardRasterHorizontal from '$lib/components/views/CardGallery.svelte'
    import PageHeader from '$lib/components/PageHeader.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import type { BlogPost } from '$lib/types/blog'
    import FullBlog from '$lib/components/FullBlog.svelte'

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

<div class="flex flex-col max-w-7xl mx-auto px-4">
    <PageHeader title="Music" className="lg:text-center" />
    <TextCard
        text="To me, music is one of the greatest joys and inspirations in life. I am an amateur DJ and am currently trying to get into music production with synthesisers, a mic and some flutes. I want to share some music and artists I love and (hopefully) some of my own makings soon!"
        classProps="text-center"
    />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-12 lg:h-full">
        <section class="text-center space-y-6 lg:col-span-2">
            <h2
                class="
                text-3xl text-text-primary mb-8
                artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
            "
            >
                What I have so far:
            </h2>
            <div class="p-6">
                <CardRasterHorizontal posts={musicPosts} {onReadMore} />
            </div>
        </section>
        <section class="text-center space-y-6">
            <h2
                class="
                text-3xl text-text-primary mb-8
                artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
            "
            >
                Coming Soon:
            </h2>
            <div class="flex flex-col gap-4">
                <TextCard
                    text="Techno and downtempo mixes with emotional touch and energy."
                    title="DJ Sets"
                    classProps="bg-primary-dark border-md rounded-lg bg-primary-dark p-6 shadow-lg transition-shadow duration-300 text-text-secondary"
                />
                <TextCard
                    text="Compositions and experimental sound design projects."
                    title="Music Production"
                    classProps="bg-primary-dark border-md rounded-lg p-6 shadow-lg transition-shadow duration-300 text-text-secondary"
                />
            </div>
        </section>
    </div>
</div>

<FullBlog post={selectedPost} />
