<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'
    import ActionLink from '$lib/components/ui/ActionLink.svelte'
    import SectionTitle from '$lib/components/ui/SectionTitle.svelte'

    let {
        personalBests,
        stravaHref,
    }: { personalBests: readonly [string, string][]; stravaHref: string } =
        $props()
</script>

<article
    class="border-ink bg-paper h-full border-b-4 p-5 max-lg:text-center md:p-10 lg:border-r-4 lg:border-b-0"
>
    <div class="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <SectionTitle class="bg-brand-red">{m.running_title()}</SectionTitle>
        <ActionLink
            class="bg-brand-orange"
            href={stravaHref}
            target="_blank"
            rel="noreferrer"
        >
            {m.follow_label()}
        </ActionLink>
    </div>
    <p class="mt-6 text-2xl leading-tight font-bold">
        {m.running_text()}
    </p>
    <div class="mt-8 grid grid-cols-2 gap-3 max-lg:mx-auto max-lg:max-w-xl">
        {#each personalBests as pb (pb[0])}
            <div class="border-ink shadow-brutal-sm border-4 bg-white p-4">
                <p class="text-sm font-black uppercase">{pb[0]}</p>
                <p class="text-brand-purple text-3xl font-black">{pb[1]}</p>
            </div>
        {/each}
    </div>
</article>
