<script lang="ts">
    let {
        text,
        variant = 'default',
        align = 'left',
        className = '',
    } = $props<{
        text: string
        variant?: 'default' | 'highlighted' | 'minimal'
        align?: 'left' | 'center' | 'right'
        className?: string
    }>()
</script>

<div
    class="
    /* Minimal theme (default) */
    bg-transparent border-none p-2 py-2 rounded-none shadow-none transition-all duration-300
    
    /* Artistic theme overrides */
    artistic:bg-bg-secondary artistic:border artistic:border-neutral-200 artistic:p-4 artistic:rounded-md artistic:shadow-sm
    
    /* Variant-specific styles for minimal theme */
    {variant === 'highlighted' ? 'border-l-4 border-l-primary' : ''}
    {variant === 'minimal' ? 'border-l-2 border-l-neutral-300' : ''}
    
    /* Artistic theme variant overrides */
    {variant === 'highlighted'
        ? 'artistic:bg-bg-tertiary artistic:border-primary artistic:shadow-md'
        : ''}
    {variant === 'minimal' ? 'artistic:border-accent' : ''}
    
    /* Hover effects for artistic theme only */
    artistic:hover:-translate-y-1 artistic:hover:shadow-lg
    
    {className}
"
    style="text-align: {align};"
>
    <p
        class="
        /* Minimal theme (default) */
        font-light tracking-wide text-text-secondary leading-relaxed m-0
        
        /* Artistic theme overrides */
        artistic:font-normal artistic:tracking-normal
    "
    >
        {@html text}
    </p>
</div>
