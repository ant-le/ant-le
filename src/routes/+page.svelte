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

<div
    class="mx-auto flex max-w-7xl flex-col artistic:border-x-4 artistic:border-text-primary"
>
    <section
        class="grid grid-cols-1 artistic:border-b-4 artistic:border-text-primary lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
    >
        <div
            class="col-span-1 flex flex-col items-center justify-center gap-4 border-b border-bg-tertiary/60 p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-12 artistic:border-b-4 lg:artistic:border-r-4 artistic:bg-accent-cyan artistic:border-text-primary"
        >
            <img
                class="mx-auto h-48 w-48 border border-bg-tertiary/60 object-cover shadow-md transition-all duration-300 filter grayscale hover:grayscale-0 artistic:border-4 artistic:border-text-primary artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)] artistic:grayscale-0 md:h-56 md:w-56"
                src={profile}
                alt="That is me."
            />
            <div class="space-y-2 text-center artistic:text-text-primary">
                <h6 class="artistic:text-text-primary">
                    Scientist / Runner / Music Enthusiast
                </h6>
                <p class="text-sm artistic:text-text-primary">
                    A small corner for research, long runs, and sound.
                </p>
            </div>
        </div>
        <div
            class="col-span-1 bg-bg-secondary px-8 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12 artistic:bg-bg-secondary"
        >
            <div class="space-y-3 md:space-y-4">
                <TextCard
                    text="Hello, I am Anton and on this little website I want to share things I am interested in, aspects of life I care about and stuff I love doing!"
                    classProps="max-w-3xl"
                />
                <TextCard
                    text="I have backgrounds in <b>political science</b> and <b>computer science</b>. My current academic interests are centered around causal inference and software development. This website is part of trying to see if/how LLMs can effectively be used to write code without extensive refactoring and debugging."
                    classProps="max-w-3xl"
                />
                <TextCard
                    text="In my free-time, I spends a lot of time listening/mixing music and running longer distances. I want to use this website to keep track and share some progress I've been making..."
                    classProps="max-w-3xl"
                />
            </div>
        </div>
    </section>
    <section
        class="grid grid-cols-1 gap-8 p-8 md:gap-10 md:p-12 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] lg:p-16 artistic:bg-bg-primary"
    >
        <div
            class="space-y-4 border border-bg-tertiary/60 p-6 artistic:border-4 artistic:border-text-primary artistic:bg-accent-violet artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)] md:p-8"
        >
            <h3 class="artistic:text-text-light">
                Here&apos;s what my friends have to say about me:
            </h3>
            <p class="artistic:text-text-light">
                A few generous words from people who know me outside the
                website.
            </p>
        </div>
        <div>
            <CardRasterHorizontal posts={friends} />
        </div>
    </section>
</div>
