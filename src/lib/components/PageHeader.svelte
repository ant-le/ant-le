<script lang="ts">
    let {
        title,
        subtitle,
        align = 'center',
        className = '',
    } = $props<{
        title: string
        subtitle?: string
        align?: 'left' | 'center' | 'right'
        className?: string
    }>()
</script>

<div class="mb-16 text-{align} {className}">
    <h1
        class="
        /* Minimal theme (default) */
        text-4xl font-light text-text-primary mb-4 tracking-widest
        
        /* Artistic theme overrides */
        artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse artistic:tracking-normal
    "
    >
        {title}
    </h1>

    {#if subtitle}
        <p
            class="
            /* Minimal theme (default) */
            text-xl font-light text-text-secondary leading-relaxed tracking-wide mx-2
            
            /* Artistic theme overrides */
            artistic:font-normal artistic:tracking-normal
        "
        >
            {subtitle}
        </p>
    {/if}
</div>
