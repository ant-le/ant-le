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

<div class="flex flex-col artistic:border-x max-w-7xl mx-auto">
    <div class="grid grid-cols-4">
        <div class="p-16 h-full bg-bg-primary col-span-1">
            <img
                class="w-48 h-48 object-cover transition-all duration-300 shadow-lg border filter grayscale hover:grayscale-0 artistic:grayscale-0 mx-auto"
                src={profile}
                alt="That is me."
            />
        </div>
        <div class="flex flex-col artistic:border-l p-8 bg-accent-green/10 col-span-3">
            <TextCard
                text="Hello, I am Anton and on this little website I want to share things I am interested in, aspects of life I care about and stuff I love doing!"
            />
            <TextCard
                text="I have backgrounds in <b>political science</b> and <b>computer science</b>. My current academic interests are centered around causal inference and software development. This website is part of trying to see if/how LLMs can effectively be used to write code without extensive refactoring and debugging."
            />
            <TextCard
                text="In my free-time, I spends a lot of time listening/mixing music and running longer distances. I want to use this website to keep track and share some progress I've been making..."
                classProps="pb-4"
            />
        </div>
    </div>
    <section class="max-w-7xl px-8 artistic:border-t pt-8 bg-bg-secondary/30">
        <h3 class="mb-6">Here's what my friends have to say about me:</h3>
        <CardRasterHorizontal posts={friends} />
    </section>
</div>
