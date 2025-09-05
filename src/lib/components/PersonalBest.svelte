<script lang="ts">
    import { type RunningPB } from '$lib/types/personalBests'

    let { pbs, className = '' } = $props<{
        pbs: RunningPB[]
        className?: string
    }>()
</script>

<div
    class="w-full transition-all duration-300 max-w-xl
    artistic:rounded-2xl artistic:border artistic:border-neutral-200 artistic:bg-bg-primary artistic:p-8 artistic:shadow-md
    {className}"
>
    <div
        class="mb-2 border-b border-neutral-300 pb-4 artistic:border-accent/20"
    >
        <h5 class="text-xl sm:text-2xl font-bold text-text-primary">
            Personal Bests
        </h5>
        <p class="text-sm sm:text-base font-normal text-text-secondary">
            All time
        </p>
    </div>

    <div>
        {#each pbs as pb, i}
            <div
                class="flex items-center justify-between border-b border-dashed border-neutral-200 py-3 artstic:border-accent/20 last:border-b-0
                {i === 0 ? 'artistic:bg-accent/5 artistic:rounded-md' : ''}"
            >
                <div class="flex items-center gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 fill-text-tertiary artistic:fill-accent/70'}"
                    >
                        <path
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 15.5a1 1 0 0 1-1-1v-2.34c-1.262-.48-2.296-1.42-2.83-2.56H6.5a1 1 0 1 1 0-2H8.2c.09-.59.27-1.15.52-1.67L7.24 6.45a1 1 0 1 1 1.52-1.3l1.5 1.76c.49-.24 1.02-.42 1.58-.53V4.5a1 1 0 1 1 2 0v1.88c2.22.45 3.81 2.44 3.81 4.79 0 .53-.09 1.04-.25 1.5H17.5a1 1 0 1 1 0 2h-1.67c-.55 1.14-1.59 2.08-2.83 2.56V16.5a1 1 0 0 1-1 1zm1.83-5.5a1.83 1.83 0 1 0-3.66 0 1.83 1.83 0 0 0 3.66 0z"
                        />
                    </svg>
                    <div>
                        <div
                            class="font-medium text-text-primary text-base sm:text-lg"
                        >
                            {pb.distance}
                        </div>
                        <div class="text-sm text-text-secondary">
                            {pb.eventLocation}
                        </div>
                    </div>
                </div>
                <div class="text-right font-semibold text-text-primary">
                    {pb.time}
                </div>
            </div>
        {/each}
    </div>
</div>
