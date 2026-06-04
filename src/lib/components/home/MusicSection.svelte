<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'

    let {
        albums,
        soundcloudHref,
    }: { albums: readonly [string, string][]; soundcloudHref: string } =
        $props()
</script>

<article class="h-full bg-brand-orange p-5 max-lg:text-center md:p-10">
    <div class="title-action-row">
        <h2 class="section-title bg-brand-teal text-white">
            {m.music_title()}
        </h2>
        <a
            class="action-link bg-brand-purple text-white"
            href={soundcloudHref}
            target="_blank"
            rel="noreferrer">{m.follow_label()}</a
        >
    </div>
    <p class="mt-6 text-2xl font-bold leading-tight">
        {m.music_text()}
    </p>
    <div class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {#each albums as [album, artist]}
            <div class="border-4 border-ink bg-white p-4 shadow-brutal-sm">
                <p class="text-sm font-black uppercase">{artist}</p>
                <p class="text-2xl font-black text-brand-purple">{album}</p>
            </div>
        {/each}
    </div>
</article>
