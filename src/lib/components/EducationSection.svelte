<script lang="ts">
    import { type CVEducationEntry } from '$lib/types/about'
    import CvIcon from '$lib/components/CvIcon.svelte'

    let { entries }: { entries: CVEducationEntry[] } = $props()

    const timelineEntries = $derived([...entries].reverse())

    function formatLabel(label: string) {
        return label
    }
</script>

<div class="mt-6 overflow-x-auto pb-4 scrollbar-custom">
    <div
        class="relative flex min-w-full items-start justify-between gap-6 px-2"
    >
        <div
            class="pointer-events-none absolute left-0 right-0 top-10 h-0.5 bg-neutral-300/70 artistic:bg-accent/30"
        ></div>
        {#each timelineEntries as entry, index (entry.degree)}
            <div
                class="group/item relative z-10 flex min-w-[14rem] flex-1 shrink-0 flex-col items-center gap-3 text-center"
            >
                <div class="text-xs font-semibold text-text-tertiary">
                    <span>{formatLabel(entry.period.from)}</span>
                    {#if entry.period.to && entry.period.to !== entry.period.from}
                        <span class="block">{formatLabel(entry.period.to)}</span
                        >
                    {/if}
                </div>

                <div
                    class="h-4 w-4 rounded-full border-2 border-neutral-300/80 bg-bg-secondary transition-colors group-hover/item:border-accent artistic:border-accent/50 artistic:group-hover/item:border-accent"
                ></div>

                <div class="space-y-3 text-left">
                    <h3>
                        {entry.degree}
                    </h3>
                    <p
                        class="text-xs uppercase tracking-wide text-text-tertiary"
                    >
                        {entry.institution} · {entry.location}
                    </p>
                    <ul
                        class="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-text-tertiary artistic:text-text-light"
                    >
                        {#each entry.focus as focus (focus)}
                            <li
                                class="rounded-full border border-neutral-300 px-3 py-1 artistic:border-accent/40"
                            >
                                {focus}
                            </li>
                        {/each}
                    </ul>
                    {#if entry.details}
                        <ul
                            class="space-y-1.5 text-xs text-text-secondary leading-relaxed"
                        >
                            {#each entry.details as detail (detail)}
                                <li class="flex items-start gap-2">
                                    <CvIcon type="bullet" className="mt-0.5" />
                                    <span>{detail}</span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
