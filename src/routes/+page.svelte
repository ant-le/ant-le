<script lang="ts">
    import { friendsData } from '$lib/types/friends'
    import CardRasterHorizontal from '$lib/components/views/CardGallery.svelte'
    import TextCard from '$lib/components/TextCard.svelte'
    import profile from '$lib/assets/profile.webp'
    let friends = $derived(friendsData)
</script>

<svelte:head>
    <title>Anton Lechuga | Home</title>
    <meta
        name="description"
        content="Personal website of Anton Lechuga - Scientist, Runner, and Music Enthusiast"
    />
</svelte:head>

<div class="flex flex-col gap-16">
    <div
        class="flex flex-col md:flex-row gap-8 items-center md:items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
        <div class="flex-shrink-0">
            <img
                class="w-52 h-52 sm:w-64 sm:h-64 object-cover rounded-lg transition-all duration-300 filter grayscale hover:grayscale-0"
                src={profile}
                alt="That is me."
            />
        </div>
        <div class="flex flex-col gap-4 max-w-prose">
            <TextCard
                text="Hello, I am Anton and on this little website I want to share things I am interested in, aspects of life I care about and stuff I love doing!"
            />
            <TextCard
                text="I have backgrounds in <b>political science</b> and <b>computer science</b>. My current academic interests are centered around causal inference and software development. This website is part of trying to see if/how LLMs can effectively be used to write code without extensive refactoring and debugging."
            />
            <TextCard
                text="In my free-time, I spends a lot of time listening/mixing music and running longer distances. I want to use this website to keep track and share some progress I've been making..."
            />
        </div>
    </div>

    <section class="p-4 border-t border-neutral-200">
        <CardRasterHorizontal posts={friends} />
    </section>
</div>
