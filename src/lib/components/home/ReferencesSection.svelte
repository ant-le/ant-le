<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'
    import SectionTitle from '$lib/components/ui/SectionTitle.svelte'
    import ReferenceCard, { type Friend } from './ReferenceCard.svelte'
    import ScrollReveal from './ScrollReveal.svelte'

    let { friends }: { friends: readonly Friend[] } = $props()
</script>

<section class="p-5 md:p-10">
    <SectionTitle
        class="bg-brand-purple text-white max-lg:mx-auto max-lg:text-center"
    >
        {m.friends_title()}
    </SectionTitle>

    <div class="mt-10 overflow-x-auto pb-4">
        <div
            class="grid auto-cols-[minmax(18rem,24rem)] grid-flow-col gap-4 xl:auto-cols-auto xl:grid-flow-row xl:grid-cols-4"
        >
            {#each friends as friend (friend.name)}
                <ScrollReveal>
                    <ReferenceCard {friend} />
                </ScrollReveal>
            {/each}
        </div>
    </div>
</section>
