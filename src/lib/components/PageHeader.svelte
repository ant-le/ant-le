<script lang="ts">
    let {
        title,
        subtitle,
        className = 'lg:text-left',
    } = $props<{
        title: string
        subtitle?: string
        className?: string
    }>()
</script>

<div class="mb-16 text-center {className}">
    <h1
        class="
        /* Minimal theme (default) */
        text-3xl font-light text-text-primary mb-4 tracking-widest md:text-4xl
        
        /* Artistic theme overrides - BRUTALIST: solid color, no gradients */
        artistic:font-bold artistic:text-text-primary artistic:tracking-normal artistic:underline artistic:decoration-accent-pink artistic:decoration-8 artistic:underline-offset-4
    "
    >
        {title}
    </h1>

    {#if subtitle}
        <p
            class="
            /* Minimal theme (default) */
            text-l md:text-2xl font-light text-text-secondary leading-relaxed tracking-wide mx-2
            
            /* Artistic theme overrides */
            artistic:font-normal artistic:tracking-normal
        "
        >
            {subtitle}
        </p>
    {/if}
</div>
