<script lang="ts">
    let {
        text,
        title,
        classProps = '',
    } = $props<{
        text: string
        title?: string
        classProps?: string
    }>()
</script>

<div
    class="mb-6 font-body text-base font-normal text-text-secondary transition-all duration-300 lg:text-lg
    artistic:text-text-primary
        {classProps}"
>
    {#if title}
        <h3 class="mb-3">{title}</h3>
    {/if}
    <p class="font-normal leading-relaxed">
        {@html text}
    </p>
</div>
