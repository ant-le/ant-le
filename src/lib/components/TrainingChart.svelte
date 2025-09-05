<script lang="ts">
    import type { RunningTraining } from '$lib/types/running'
    import type { NavItem } from '$lib/types/types'
    import { calculateTrainingSummary } from '$lib/utils'
    import { fly } from 'svelte/transition'
    import Dropdown from './Dropdown.svelte'

    let { data, className = '' } = $props<{
        data: RunningTraining[]
        className?: string
    }>()

    // --- State for Chart Interactivity ---
    let tooltip = $state({ visible: false, content: '', x: 0, y: 0 })
    let hoveredBarIndex = $state<number | null>(null)

    // --- State for Time Filter ---
    const timeFilterOptions: NavItem[] = [
        { value: '30', label: 'Last 30 days' },
        { value: '180', label: 'Last 6 months' },
        { value: '365', label: 'Last year' },
        { value: '730', label: 'Last 2 years' },
        { value: 'all', label: 'All time' },
    ]
    let selectedTimeFilter: NavItem = $state(timeFilterOptions[0])

    // --- Derived Computations ---
    let filteredSummary = $derived(
        calculateTrainingSummary(data, selectedTimeFilter.value)
    )
    let chartData = $derived(
        [...filteredSummary.trainings].sort(
            (a: RunningTraining, b: RunningTraining) =>
                a.date.getTime() - b.date.getTime()
        )
    )
    const padding = { top: 30, right: 30, bottom: 60, left: 80 }
    const viewBoxWidth = 800
    const viewBoxHeight = 300
    let maxDistance = $derived(
        Math.max(...chartData.map((d: RunningTraining) => d.distance), 0)
    )
    let bars = $derived(
        chartData.map((entry: RunningTraining, index: number) => {
            const barWidth =
                Math.max(
                    2,
                    (viewBoxWidth - padding.left - padding.right) /
                        chartData.length
                ) * 0.8
            const barHeight =
                (entry.distance / maxDistance) *
                (viewBoxHeight - padding.top - padding.bottom)
            const x =
                padding.left +
                (index / (chartData.length - 1 || 1)) *
                    (viewBoxWidth - padding.left - padding.right)
            const y = viewBoxHeight - padding.bottom - barHeight
            return {
                x,
                y,
                width: barWidth,
                height: barHeight,
                distance: entry.distance,
                date: entry.date,
            }
        })
    )
    let diff = $derived(
        filteredSummary.prevWeeklyAverage > 0
            ? ((filteredSummary.weeklyAverage -
                  filteredSummary.prevWeeklyAverage) /
                  filteredSummary.prevWeeklyAverage) *
                  100
            : 0
    )
    let isUp = $derived(diff >= 0)

    // --- Interactivity Handlers ---
    function handleMouseOver(bar: (typeof bars)[0], index: number) {
        tooltip.visible = true
        tooltip.content = `${bar.distance.toFixed(1)} km on ${bar.date.toLocaleDateString()}`

        // Position the tooltip relative to the bar, not the mouse
        tooltip.x = bar.x // Center of the bar
        tooltip.y = bar.y - 10 // 10px above the bar

        hoveredBarIndex = index
    }

    function handleMouseOut() {
        tooltip.visible = false
        hoveredBarIndex = null
    }
</script>

{#if tooltip.visible}
    <div
        class="pointer-events-none fixed z-10 rounded-md bg-bg-tertiary p-2 text-sm text-text-light shadow-lg"
        style="left: {tooltip.x + 10}px; top: {tooltip.y - 30}px;"
        in:fly={{ y: -5, duration: 200 }}
    >
        {tooltip.content}
    </div>
{/if}

<div
    class="w-full transition-all duration-300
    artistic:rounded-2xl artistic:border artistic:border-neutral-200 artistic:bg-bg-primary artistic:p-8 artistic:shadow-md
    {className}"
>
    <div class="flex items-center justify-between pb-4">
        <div>
            <h5 class="text-xl font-bold text-text-primary">Training Volume</h5>
            <p class="text-sm font-normal text-text-secondary">
                {selectedTimeFilter.label}
            </p>
        </div>
        <Dropdown
            options={timeFilterOptions}
            bind:selectedValue={selectedTimeFilter}
            position="bottom"
            triggerLabel="Select time range"
        />
    </div>

    <div class="relative w-full" id="column-chart">
        <svg
            viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
            class="h-auto w-full"
            aria-labelledby="chart-title"
        >
            <defs>
                <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0%"
                        stop-color="var(--color-accent-light, #60a5fa)"
                    />
                    <stop
                        offset="100%"
                        stop-color="var(--color-accent, #2563eb)"
                    />
                </linearGradient>
            </defs>

            {#each Array.from({ length: 5 }) as _, i}
                {@const y =
                    padding.top +
                    (i * (viewBoxHeight - padding.top - padding.bottom)) / 4}
                {@const value = ((maxDistance * (4 - i)) / 4).toFixed(0)}
                <g class="text-3xl opacity-80">
                    <line
                        x1={padding.left}
                        y1={y}
                        x2={viewBoxWidth - padding.right}
                        y2={y}
                        class="stroke-current text-neutral-300 artistic:text-accent/20"
                        stroke-width="1.5"
                        stroke-dasharray="2 4"
                    />
                    <text
                        x={padding.left - 15}
                        y={y + 5}
                        text-anchor="end"
                        font-size="18"
                        class="font-medium fill-current text-text-tertiary artistic:text-text-tertiary"
                        >{value} km</text
                    >
                </g>
            {/each}

            <g>
                {#each bars as bar, index}
                    <rect
                        x={bar.x - bar.width / 2}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        rx="2"
                        ry="2"
                        class="origin-bottom transition-all duration-200
                               fill-neutral-400
                               artistic:fill-[url(#bar-gradient)]
                               hover:-translate-y-1.5"
                        class:opacity-40={hoveredBarIndex !== null &&
                            hoveredBarIndex !== index}
                        onmouseover={() => handleMouseOver(bar, index)}
                        onmouseout={handleMouseOut}
                        onblur={handleMouseOut}
                        onfocus={() => handleMouseOver(bar, index)}
                        tabindex="-1"
                        role="graphics-symbol"
                    />
                {/each}
            </g>

            {#each chartData as entry, index}
                {@const x =
                    padding.left +
                    (index / (chartData.length - 1)) *
                        (viewBoxWidth - padding.left - padding.right)}
                {@const shouldShowLabel =
                    index % Math.max(1, Math.floor(chartData.length / 8)) === 0}
                {#if shouldShowLabel}
                    <text
                        {x}
                        y={viewBoxHeight - 20}
                        text-anchor="middle"
                        font-size="14"
                        class="fill-current text-text-tertiary artistic:text-tertiary"
                    >
                        {selectedTimeFilter.value === '30'
                            ? entry.date.toLocaleDateString('default', {
                                  day: 'numeric',
                                  month: 'short',
                              })
                            : entry.date.toLocaleDateString('default', {
                                  month: 'short',
                                  year: '2-digit',
                              })}
                    </text>
                {/if}
            {/each}
        </svg>
    </div>

    <div
        class="mt-4 flex items-center justify-between border-t border-neutral-300 pt-4 artistic:border-accent/20"
    >
        <div class="text-center ml-16">
            <div class="text-sm text-text-tertiary">Total Time</div>
            <div class="font-semibold text-text-primary">
                {filteredSummary.totalTime.toFixed(1)}h
            </div>
        </div>
        <div class="text-center">
            <div class="text-sm text-text-tertiary">Weekly Avg</div>
            <div class="font-semibold text-text-primary">
                {filteredSummary.weeklyAverage.toFixed(1)} km
            </div>
        </div>
        <div class="text-center mr-16">
            <div class="text-sm text-text-tertiary">vs Prev. Period</div>
            <div
                class="flex items-center justify-center font-semibold text-text-primary"
            >
                <svg
                    class="h-3 w-3 me-1.5 text-text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style="transform: {isUp ? 'rotate(180deg)' : 'rotate(0)'};"
                >
                    <path
                        d="M10 2.5a.75.75 0 0 1 .75.75v10.31l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V3.25a.75.75 0 0 1 .75-.75z"
                    >
                    </path>
                </svg>
                <span>{Math.abs(diff).toFixed(0)}%</span>
            </div>
        </div>
    </div>
</div>
