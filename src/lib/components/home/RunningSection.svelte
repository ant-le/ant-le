<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'

    let {
        personalBests,
        stravaHref,
    }: { personalBests: readonly [string, string][]; stravaHref: string } =
        $props()
</script>

<article
    class="border-b-4 border-ink bg-paper p-5 max-lg:text-center md:p-10 lg:border-b-0 lg:border-r-4"
>
    <div class="title-action-row">
        <h2 class="section-title bg-brand-red">{m.running_title()}</h2>
        <a
            class="action-link bg-brand-orange"
            href={stravaHref}
            target="_blank"
            rel="noreferrer">{m.strava_label()}</a
        >
    </div>
    <p class="mt-6 text-2xl font-bold leading-tight">
        {m.running_text()}
    </p>
    <div class="mt-8 grid grid-cols-2 gap-3 max-lg:mx-auto max-lg:max-w-xl">
        {#each personalBests as pb}
            <div class="border-4 border-ink bg-white p-4 shadow-brutal-sm">
                <p class="text-sm font-black uppercase">{pb[0]}</p>
                <p class="text-3xl font-black text-brand-purple">{pb[1]}</p>
            </div>
        {/each}
    </div>
</article>
