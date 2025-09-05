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
    class="transition-all duration-300 b-8 p-2
    text-text-secondary font-light text-base lg:text-lg t
        artistic:border artistic:border-neutral-200
        artistic:rounded-md artistic:shadow-sm
        artistic:hover:-translate-y-1 artistic:hover:shadow-lg
        {classProps}"
>
    {#if title}
        <h3 class="text-text-primary text-xl mb-3 font-normal">{title}</h3>
    {/if}
    <p class="font-light tracking-wide leading-relaxed">
        {@html text}
    </p>
</div>
