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
    class="transition-all duration-300 b-8 p-2 font-body
    text-text-secondary font-normal text-base lg:text-lg
        {classProps}"
>
    {#if title}
        <h3>{title}</h3>
    {/if}
    <p class="font-normal tracking-wide leading-relaxed">
        {@html text}
    </p>
</div>
