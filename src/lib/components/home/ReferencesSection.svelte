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
        <div class="flex w-max gap-4">
            {#each friends as friend (friend.name)}
                <ScrollReveal class="w-[min(82vw,24rem)] shrink-0">
                    <ReferenceCard {friend} />
                </ScrollReveal>
            {/each}
        </div>
    </div>
</section>
