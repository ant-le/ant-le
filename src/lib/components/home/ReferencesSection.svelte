<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'
    import ReferenceCard, { type Friend } from './ReferenceCard.svelte'
    import ScrollReveal from './ScrollReveal.svelte'

    let { friends }: { friends: readonly Friend[] } = $props()
</script>

<section class="p-5 md:p-10">
    <h2
        class="section-title bg-brand-purple text-white max-lg:mx-auto max-lg:text-center"
    >
        {m.friends_title()}
    </h2>

    <div class="mt-10 overflow-x-auto pb-4">
        <div
            class="grid auto-cols-[minmax(18rem,24rem)] grid-flow-col gap-4 xl:grid-flow-row xl:grid-cols-4 xl:auto-cols-auto"
        >
            {#each friends as friend}
                <ScrollReveal>
                    <ReferenceCard {friend} />
                </ScrollReveal>
            {/each}
        </div>
    </div>
</section>
