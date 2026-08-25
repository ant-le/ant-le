<script lang="ts">
    import type { Pathname } from '$app/types'
    import { resolve } from '$app/paths'
    import { m } from '$lib/paraglide/messages.js'
    import ActionLink from '$lib/components/ui/ActionLink.svelte'
    import BrutalCard from '$lib/components/ui/BrutalCard.svelte'
    import SectionTitle from '$lib/components/ui/SectionTitle.svelte'
</script>

<div class="flex flex-col justify-center gap-6 p-5 max-lg:text-center md:p-10">
    <div class="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <SectionTitle class="bg-brand-purple text-white">
            {m.work_study_title()}
        </SectionTitle>
        <div class="flex flex-wrap justify-end gap-2 sm:gap-4">
            <ActionLink class="bg-brand-orange" href={m.contact_href()}>
                {m.contact_label()}
            </ActionLink>
            <ActionLink
                class="bg-brand-teal text-white"
                href={resolve(m.cv_href() as Pathname)}
                download={m.cv_download()}
            >
                {m.cv_label()}
            </ActionLink>
        </div>
    </div>
    <div class="grid gap-4 text-xl leading-tight font-semibold md:grid-cols-3">
        <BrutalCard as="p">{m.study_text()}</BrutalCard>
        <BrutalCard as="p">{m.work_text()}</BrutalCard>
        <BrutalCard as="p">{m.life_text()}</BrutalCard>
    </div>
</div>
