<script lang="ts">
    import { type CVEducationEntry } from '$lib/types/about'
    import CvIcon from '$lib/components/CvIcon.svelte'

    let { entries }: { entries: CVEducationEntry[] } = $props()

    const timelineEntries = $derived([...entries].reverse())
    const degreeEntries = $derived(
        timelineEntries.filter((entry) =>
            /\b(MA|MS|MSc|BA|BSc|Bachelor|Master)\b/i.test(entry.degree)
        )
    )
    const additionalEntries = $derived(
        timelineEntries.filter((entry) => !degreeEntries.includes(entry))
    )

    function formatLabel(label: string) {
        return label
    }
</script>

<div class="mt-8 space-y-12">
    <div class="overflow-x-auto pb-6 scrollbar-custom">
        <div
            class="relative mx-auto flex min-w-full flex-wrap items-end justify-between gap-12 px-4"
        >
            <div
                class="pointer-events-none absolute bottom-6 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-bg-tertiary/60 to-transparent artistic:via-text-primary/40"
                aria-hidden="true"
            ></div>
            {#each degreeEntries as entry (entry.degree)}
                <article
                    class="group/degree relative z-10 flex w-full max-w-[22rem] flex-col items-center text-center md:w-auto md:flex-1"
                >
                    <div
                        class="w-full rounded-3xl border border-bg-tertiary/60 bg-bg-secondary/85 p-8 text-left shadow-md transition-all duration-200 group-hover/degree:-translate-y-1 group-hover/degree:border-text-primary/40 group-hover/degree:shadow-lg artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                    >
                        <h3 class="text-lg font-semibold text-text-primary">
                            {entry.degree}
                        </h3>
                        <p
                            class="mt-2 text-xs uppercase tracking-[0.18em] text-text-secondary/70 artistic:text-text-primary/80"
                        >
                            {entry.institution} · {entry.location}
                        </p>

                        {#if entry.focus && entry.focus.length}
                            <ul
                                class="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-text-secondary/70 artistic:text-text-primary/80"
                            >
                                {#each entry.focus as focus (focus)}
                                    <li
                                        class="rounded-full border border-bg-tertiary/60 bg-bg-secondary px-3 py-1 leading-none artistic:border-4 artistic:border-text-primary artistic:bg-bg-primary"
                                    >
                                        {focus}
                                    </li>
                                {/each}
                            </ul>
                        {/if}

                        {#if entry.details && entry.details.length}
                            <ul
                                class="mt-5 space-y-1.5 text-sm leading-relaxed text-text-secondary"
                            >
                                {#each entry.details as detail (detail)}
                                    <li class="flex items-start gap-2">
                                        <CvIcon
                                            type="bullet"
                                            className="mt-0.5 shrink-0"
                                        />
                                        <span>{detail}</span>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                    <div
                        class="mt-5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg-tertiary/70 bg-bg-secondary text-accent-orange shadow-sm artistic:border-4 artistic:border-text-primary artistic:bg-accent-pink"
                        aria-hidden="true"
                    >
                        <span
                            class="h-2.5 w-2.5 rounded-full bg-accent-orange artistic:bg-text-primary"
                        ></span>
                    </div>
                    <div
                        class="mt-2 text-xs font-semibold uppercase tracking-wide text-text-secondary/70"
                    >
                        <span>{formatLabel(entry.period.from)}</span>
                        {#if entry.period.to && entry.period.to !== entry.period.from}
                            <span class="ml-2 text-text-secondary/60">
                                {formatLabel(entry.period.to)}
                            </span>
                        {/if}
                    </div>
                </article>
            {/each}
        </div>
    </div>

    {#if additionalEntries.length}
        <div class="space-y-8">
            <h4
                class="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary/70 artistic:text-text-primary/80"
            >
                Complementary Studies & Exchanges
            </h4>
            <div class="grid gap-8 md:grid-cols-2">
                {#each additionalEntries as entry (entry.degree)}
                    <article
                        class="group/supplement relative overflow-hidden rounded-2xl border border-bg-tertiary/60 bg-bg-secondary/70 p-6 shadow-md transition-colors duration-200 group-hover/supplement:border-text-primary/50 artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                    >
                        <header class="flex flex-col gap-2">
                            <p
                                class="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/70 artistic:text-text-primary/80"
                            >
                                {formatLabel(entry.period.from)}
                                {#if entry.period.to && entry.period.to !== entry.period.from}
                                    <span
                                        class="mx-1 text-text-secondary/60 artistic:text-text-primary/70"
                                        >–</span
                                    >
                                    {formatLabel(entry.period.to)}
                                {/if}
                            </p>
                            <h3
                                class="text-base font-semibold text-text-primary"
                            >
                                {entry.degree}
                            </h3>
                            <p class="text-sm font-medium text-text-secondary">
                                {entry.institution}
                                <span
                                    class="block text-xs uppercase tracking-wide text-text-secondary/70 artistic:text-text-primary/80"
                                >
                                    {entry.location}
                                </span>
                            </p>
                        </header>

                        {#if entry.focus && entry.focus.length}
                            <ul
                                class="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-text-secondary/70 artistic:text-text-primary/80"
                            >
                                {#each entry.focus as focus (focus)}
                                    <li
                                        class="rounded-full border border-bg-tertiary/60 bg-bg-secondary/80 px-3 py-1 leading-none artistic:border-4 artistic:border-text-primary artistic:bg-bg-primary"
                                    >
                                        {focus}
                                    </li>
                                {/each}
                            </ul>
                        {/if}

                        {#if entry.details && entry.details.length}
                            <ul
                                class="mt-4 space-y-1.5 text-sm leading-relaxed text-text-secondary"
                            >
                                {#each entry.details as detail (detail)}
                                    <li class="flex items-start gap-2">
                                        <CvIcon
                                            type="bullet"
                                            className="mt-0.5 shrink-0"
                                        />
                                        <span>{detail}</span>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </article>
                {/each}
            </div>
        </div>
    {/if}
</div>
