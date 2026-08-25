<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'
    import ActionLink from '$lib/components/ui/ActionLink.svelte'
    import SectionTitle from '$lib/components/ui/SectionTitle.svelte'

    let {
        albums,
        soundcloudHref,
    }: { albums: readonly [string, string][]; soundcloudHref: string } =
        $props()
</script>

<article class="bg-brand-orange h-full p-5 max-lg:text-center md:p-10">
    <div class="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <SectionTitle class="bg-brand-teal text-white">
            {m.music_title()}
        </SectionTitle>
        <ActionLink
            class="bg-brand-purple text-white"
            href={soundcloudHref}
            target="_blank"
            rel="noreferrer"
        >
            {m.follow_label()}
        </ActionLink>
    </div>
    <p class="mt-6 text-2xl leading-tight font-bold">
        {m.music_text()}
    </p>
    <div class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {#each albums as [album, artist] (album)}
            <div class="border-ink shadow-brutal-sm border-4 bg-white p-4">
                <p class="text-sm font-black uppercase">{artist}</p>
                <p class="text-brand-purple text-2xl font-black">{album}</p>
            </div>
        {/each}
    </div>
</article>
