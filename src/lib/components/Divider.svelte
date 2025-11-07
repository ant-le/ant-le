<script lang="ts">
    let { direction = 'h' }: { direction?: 'v' | 'h' } = $props()
</script>

{#if direction === 'h'}
    <hr class="border-bg-tertiary/60" />
{:else}
    <vr class="border-bg-tertiary/60"></vr>
{/if}
