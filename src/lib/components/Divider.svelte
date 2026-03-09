<script lang="ts">
    let { direction = 'h' }: { direction?: 'v' | 'h' } = $props()
</script>

{#if direction === 'h'}
    <div class="my-8 flex items-center gap-4 artistic:my-10">
        <div
            class="h-px flex-1 bg-bg-tertiary/60 artistic:h-1 artistic:bg-text-primary"
        ></div>
        <div
            class="hidden h-3 w-3 border border-bg-tertiary/60 artistic:block artistic:border-4 artistic:border-text-primary artistic:bg-accent-pink sm:block"
        ></div>
        <div
            class="h-px flex-1 bg-bg-tertiary/60 artistic:h-1 artistic:bg-text-primary"
        ></div>
    </div>
{:else}
    <div
        class="mx-auto h-full w-px bg-bg-tertiary/60 artistic:w-1 artistic:bg-text-primary"
    ></div>
{/if}
