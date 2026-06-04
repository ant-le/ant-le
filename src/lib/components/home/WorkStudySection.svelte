<script lang="ts">
    import type { Pathname } from '$app/types'
    import { resolve } from '$app/paths'
    import { m } from '$lib/paraglide/messages.js'
</script>

<div class="flex flex-col justify-center gap-6 p-5 max-lg:text-center md:p-10">
    <div class="title-action-row">
        <h2 class="section-title bg-brand-purple text-white">
            {m.work_study_title()}
        </h2>
        <div class="flex flex-wrap gap-4 max-lg:justify-center">
            <a class="action-link bg-brand-orange" href={m.contact_href()}
                >{m.contact_label()}</a
            >
            <a
                class="action-link bg-brand-teal text-white"
                href={resolve(m.cv_href() as Pathname)}
                download={m.cv_download()}>{m.cv_label()}</a
            >
        </div>
    </div>
    <div class="grid gap-4 text-xl font-semibold leading-tight md:grid-cols-3">
        <p class="brutal-card">
            {m.study_intro()}
            <strong>{m.political_science()}</strong>
            {m.study_connector()}
            <strong>{m.computer_science()}</strong>. {m.study_focus()}
            <strong>{m.causal_inference()}</strong>
            {m.study_end()}
        </p>
        <p class="brutal-card">{m.work_text()}</p>
        <p class="brutal-card">{m.life_text()}</p>
    </div>
</div>
