<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'

    let {
        artists,
        soundcloudHref,
    }: { artists: readonly string[]; soundcloudHref: string } = $props()
</script>

<article class="bg-brand-orange p-5 max-lg:text-center md:p-10">
    <div class="title-action-row">
        <h2 class="section-title bg-brand-teal text-white">
            {m.music_title()}
        </h2>
        <a
            class="action-link bg-brand-purple text-white"
            href={soundcloudHref}
            target="_blank"
            rel="noreferrer">{m.soundcloud_label()}</a
        >
    </div>
    <p class="mt-6 text-2xl font-bold leading-tight">
        {m.music_text()}
    </p>
    <ul class="mt-8 grid gap-3">
        {#each artists as artist}
            <li
                class="border-4 border-ink bg-paper px-4 py-3 text-xl font-black uppercase shadow-brutal-sm"
            >
                {artist}
            </li>
        {/each}
    </ul>
</article>
