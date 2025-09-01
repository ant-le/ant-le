<script lang="ts">
    import type { RunningTraining } from '$lib/types'
    import {
        getTotalDistanceForPeriod,
        getTotalDistanceAllYears,
        getWeeklyAverageForYear,
    } from '$lib/utils'

    let { data, className = '' } = $props<{
        data: RunningTraining[]
        className?: string
    }>()

    // Sort data by date for chronological display
    let sortedData = $derived(
        [...data].sort((a, b) => a.date.getTime() - b.date.getTime())
    )

    // Calculate current year stats
    let currentYear = $derived(new Date().getFullYear())
    let currentYearStart = $derived(new Date(currentYear, 0, 1))
    let currentYearEnd = $derived(new Date(currentYear, 11, 31))

    let currentYearTotal = $derived(
        getTotalDistanceForPeriod(data, currentYearStart, currentYearEnd)
    )
    let currentYearWeeklyAverage = $derived(
        getWeeklyAverageForYear(data, currentYear)
    )

    // Calculate last year stats
    let lastYear = $derived(currentYear - 1)
    let lastYearStart = $derived(new Date(lastYear, 0, 1))
    let lastYearEnd = $derived(new Date(lastYear, 11, 31))

    let lastYearWeeklyAverage = $derived(
        getWeeklyAverageForYear(data, lastYear)
    )

    // Calculate total distance across all years
    let totalDistanceAllYears = $derived(getTotalDistanceAllYears(data))

    // Chart dimensions - make it responsive
    let chartWidth = $derived(800)
    let chartHeight = $derived(300)
    let padding = $derived(60)

    // Calculate scales for individual runs
    let maxDistance = $derived(Math.max(...sortedData.map((d) => d.distance)))
    let xScale = $derived((chartWidth - 2 * padding) / (sortedData.length - 1))
    let yScale = $derived((chartHeight - 2 * padding) / maxDistance)

    // Generate bars for individual runs
    let bars = $derived(
        sortedData.map((entry, index) => {
            const x = padding + index * xScale
            const barWidth = Math.max(2, xScale * 0.8) // Bar width with some spacing
            const barHeight = entry.distance * yScale
            const y = chartHeight - padding - barHeight
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
</script>

<div
    class="
    /* Minimal theme (default) */
    bg-transparent shadow-none rounded-lg p-6 w-full
    
    /* Artistic theme overrides */
    artistic:bg-gradient-to-br artistic:from-bg-secondary artistic:to-primary/10 artistic:shadow-xl artistic:border-2 artistic:border-accent artistic:rounded-2xl artistic:w-full artistic:backdrop-blur-sm
    
    {className}
"
>
    <h3
        class="
        /* Minimal theme (default) */
        text-xl font-normal text-text-primary mb-4 tracking-wide
        
        /* Artistic theme overrides */
        artistic:font-bold artistic:tracking-normal artistic:bg-gradient-to-r artistic:from-primary artistic:via-secondary artistic:to-accent artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
    "
    >
        Individual Run Distances
    </h3>

    <div class="relative w-full overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} class="w-full min-w-full">
            <!-- Grid lines -->
            {#each Array.from({ length: 5 }) as _, i}
                {@const y = padding + (i * (chartHeight - 2 * padding)) / 4}
                <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    class="
                        /* Minimal theme (default) */
                        stroke-neutral-400
                        
                        /* Artistic theme overrides */
                        artistic:stroke-accent/30
                    "
                    stroke-width="1"
                />
                <text
                    x={padding - 10}
                    y={y + 4}
                    text-anchor="end"
                    font-size="12"
                    class="
                        /* Minimal theme (default) */
                        fill-text-tertiary
                        
                        /* Artistic theme overrides */
                        artistic:fill-secondary artistic:font-bold
                    "
                >
                    {((maxDistance * (4 - i)) / 4).toFixed(0)}km
                </text>
            {/each}

            <!-- Date labels (show every nth date to avoid overcrowding) -->
            {#each sortedData as entry, index}
                {@const x = padding + index * xScale}
                {@const shouldShowLabel =
                    index % Math.max(1, Math.floor(sortedData.length / 8)) ===
                    0}
                {#if shouldShowLabel}
                    <text
                        {x}
                        y={chartHeight - 10}
                        text-anchor="middle"
                        font-size="10"
                        class="
                            /* Minimal theme (default) */
                            fill-text-tertiary
                            
                            /* Artistic theme overrides */
                            artistic:fill-secondary artistic:font-medium
                        "
                    >
                        {entry.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </text>
                {/if}
            {/each}

            <!-- Individual run bars -->
            {#each bars as bar}
                <rect
                    x={bar.x - bar.width / 2}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    class="
                        /* Minimal theme (default) */
                        fill-neutral-400 stroke-neutral-600
                        
                        /* Artistic theme overrides */
                        artistic:fill-accent artistic:stroke-accent-2 artistic:stroke-width-2 artistic:shadow-lg
                    "
                    stroke-width="1"
                />
            {/each}
        </svg>
    </div>

    <!-- Summary stats - only two boxes -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Weekly Average for Current Year with Previous Year Comparison -->
        <div
            class="
            /* Minimal theme (default) */
            p-3 bg-transparent border border-neutral-400 rounded-md
            
            /* Artistic theme overrides */
            artistic:p-6 artistic:bg-gradient-to-br artistic:from-primary/20 artistic:to-secondary/20 artistic:border-2 artistic:border-accent artistic:rounded-xl artistic:shadow-lg
        "
        >
            <div
                class="
                /* Minimal theme (default) */
                text-lg font-normal text-neutral-600
                
                /* Artistic theme overrides */
                artistic:text-2xl artistic:font-bold artistic:text-primary artistic:animate-pulse
            "
            >
                {currentYearWeeklyAverage.toFixed(1)} km/week
            </div>
            <div
                class="
                /* Minimal theme (default) */
                text-sm font-light text-neutral-500 mt-1
                
                /* Artistic theme overrides */
                artistic:font-normal artistic:text-secondary artistic:mt-2
            "
            >
                {currentYear} weekly average
                <span
                    class="
                    /* Minimal theme (default) */
                    block text-xs text-neutral-400 mt-1
                    
                    /* Artistic theme overrides */
                    artistic:block artistic:text-xs artistic:text-secondary artistic:mt-1
                "
                >
                    vs {lastYear}: {currentYearWeeklyAverage >
                    lastYearWeeklyAverage
                        ? '+'
                        : ''}{(
                        currentYearWeeklyAverage - lastYearWeeklyAverage
                    ).toFixed(1)} km/week
                </span>
            </div>
        </div>

        <!-- Total Distance All Years with Current Year as Subscript -->
        <div
            class="
            /* Minimal theme (default) */
            p-3 bg-transparent border border-neutral-400 rounded-md
            
            /* Artistic theme overrides */
            artistic:p-6 artistic:bg-gradient-to-br artistic:from-secondary/20 artistic:to-accent/20 artistic:border-2 artistic:border-secondary artistic:rounded-xl artistic:shadow-lg
        "
        >
            <div
                class="
                /* Minimal theme (default) */
                text-lg font-normal text-neutral-600
                
                /* Artistic theme overrides */
                artistic:text-2xl artistic:font-bold artistic:text-secondary artistic:animate-pulse
            "
            >
                {totalDistanceAllYears.toFixed(1)} km
            </div>
            <div
                class="
                /* Minimal theme (default) */
                text-sm font-light text-neutral-500 mt-1
                
                /* Artistic theme overrides */
                artistic:font-normal artistic:text-secondary artistic:mt-2
            "
            >
                Total distance all years
                <span
                    class="
                    /* Minimal theme (default) */
                    block text-xs text-neutral-400 mt-1
                    
                    /* Artistic theme overrides */
                    artistic:block artistic:text-xs artistic:text-secondary artistic:mt-1
                "
                >
                    {currentYear}: {currentYearTotal.toFixed(1)} km
                </span>
            </div>
        </div>
    </div>
</div>
