<script lang="ts">
    import { friendsData } from '$lib/data'
    import CardRasterHorizontal from '$lib/components/CardRasterHorizontal.svelte'
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

<div class="max-w-5xl mx-auto mt-16 flex flex-col gap-16">
    <div class="flex flex-col md:flex-row mx-auto gap-2">
        <div class="m-auto">
            <img
                class="h-auto max-w-xs sm:max-w-s transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
                src={profile}
                alt="That is me."
            />
        </div>
        <div class="flex flex-col gap-1 p-2">
            <TextCard
                text="Hello, I am Anton and on this little website I want to share things I am interested in, 
        aspects of life I care about and stuff I love doing!"
            />

            <TextCard
                text="I have backgrounds in <b>political science</b> and <b>computer science</b>. 
        My current academic interests are centered around causal inference and software development. This website is part of
        tying to see if/how LLMs can effectively used to write code without extensive refactoring and debugging."
            />

            <TextCard
                text="In my free-time, I spends a lot of time listening/mixing music
        and running longer distances. I want to use this website to keep track
        and share some progress I've been making..."
            />
        </div>
    </div>

    <!-- Friends Section -->
    <section class="p-4 border-t border-neutral-200">
        <CardRasterHorizontal
            posts={friends}
            className="
        "
        />
    </section>
</div>
