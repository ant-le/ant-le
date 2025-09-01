<script lang="ts">
    import type { RunningPB } from '$lib/types'

    let { pbs, className = '' } = $props<{
        pbs: RunningPB[]
        className?: string
    }>()
</script>

<div
    class="
    /* Minimal theme (default) */
    bg-transparent shadow-none rounded-lg p-6 transition-all duration-300
    
    /* Artistic theme overrides */
    artistic:bg-bg-primary artistic:shadow-md artistic:border artistic:border-neutral-200
    
    {className}
"
>
    <h3
        class="
        /* Minimal theme (default) */
        text-xl font-normal text-text-primary mb-6
        
        /* Artistic theme overrides */
        artistic:font-semibold
    "
    >
        Personal Bests
    </h3>

    <div
        class="
        /* Minimal theme (default) */
        space-y-3
        
        /* Artistic theme overrides */
        artistic:space-y-4
    "
    >
        {#each pbs as pb}
            <div
                class="
                /* Minimal theme (default) */
                flex justify-between items-center p-3 bg-transparent border border-neutral-300 rounded-md transition-all duration-300 hover:border-neutral-400
                
                /* Artistic theme overrides */
                artistic:bg-bg-tertiary artistic:border-neutral-200 artistic:hover:bg-bg-secondary artistic:hover:border-neutral-300
            "
            >
                <div>
                    <div
                        class="
                        /* Minimal theme (default) */
                        font-normal text-text-primary
                        
                        /* Artistic theme overrides */
                        artistic:font-medium
                    "
                    >
                        {pb.distance}
                    </div>
                    <div
                        class="
                        /* Minimal theme (default) */
                        text-sm font-light text-text-secondary
                        
                        /* Artistic theme overrides */
                        artistic:font-normal
                    "
                    >
                        {pb.eventLocation}
                    </div>
                </div>
                <div
                    class="
                    /* Minimal theme (default) */
                    text-right font-normal text-text-primary
                    
                    /* Artistic theme overrides */
                    artistic:font-medium
                "
                >
                    {pb.time}
                </div>
            </div>
        {/each}
    </div>
</div>
