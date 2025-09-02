<script lang="ts">
    import { page } from '$app/state'
    import { goto } from '$app/navigation'
    import { base } from '$app/paths'

    let { error } = $props<{
        error: Error & { status?: number; message?: string }
    }>()

    function goHome() {
        goto(base + '/')
    }
</script>

<svelte:head>
    <title>Error | Anton Lechuga</title>
</svelte:head>

<main
    class="
    /* Minimal theme (default) */
    min-h-screen flex items-center justify-center py-16
    
    /* Artistic theme overrides */
    artistic:min-h-screen artistic:flex artistic:items-center artistic:justify-center artistic:py-20
"
>
    <div
        class="
        /* Minimal theme (default) */
        text-center max-w-md mx-auto px-4
        
        /* Artistic theme overrides */
        artistic:text-center artistic:max-w-lg artistic:mx-auto artistic:px-4
    "
    >
        <!-- Error Icon -->
        <div
            class="
            /* Minimal theme (default) */
            inline-flex items-center justify-center w-30 h-30 rounded-full bg-transparent border-2 border-neutral-300 transition-all duration-300 shadow-none mb-8
            
            /* Artistic theme overrides */
            artistic:bg-gradient-to-br artistic:from-primary-light artistic:to-secondary artistic:border-neutral-300 artistic:animate-pulse artistic:shadow-lg artistic:mb-12
        "
        >
            <svg
                class="
                /* Minimal theme (default) */
                w-16 h-16 text-text-secondary
                
                /* Artistic theme overrides */
                artistic:w-20 artistic:h-20 artistic:text-text-light
            "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
            </svg>
        </div>

        <!-- Error Message -->
        <h1
            class="
            /* Minimal theme (default) */
            text-4xl font-normal text-text-primary mb-4 tracking-wide
            
            /* Artistic theme overrides */
            artistic:text-5xl artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse artistic:tracking-normal
        "
        >
            {error.status || 500}
        </h1>

        <p
            class="
            /* Minimal theme (default) */
            text-lg font-light text-text-secondary mb-8 tracking-wide
            
            /* Artistic theme overrides */
            artistic:text-xl artistic:font-normal artistic:tracking-normal artistic:mb-12
        "
        >
            {error.message || 'Something went wrong'}
        </p>

        <!-- Error Details (for development) -->
        {#if page.url.hostname === 'localhost'}
            <div
                class="
                /* Minimal theme (default) */
                mb-8 p-4 bg-neutral-100 rounded-md text-left border border-neutral-300
                
                /* Artistic theme overrides */
                artistic:mb-12 artistic:p-6 artistic:bg-bg-secondary artistic:rounded-lg artistic:border-neutral-200 artistic:shadow-md
            "
            >
                <h3
                    class="
                    /* Minimal theme (default) */
                    text-sm font-normal text-text-primary mb-2
                    
                    /* Artistic theme overrides */
                    artistic:font-semibold
                "
                >
                    Error Details:
                </h3>
                <pre
                    class="
                    /* Minimal theme (default) */
                    text-xs font-light text-text-tertiary whitespace-pre-wrap
                    
                    /* Artistic theme overrides */
                    artistic:font-normal artistic:text-text-secondary
                ">
                    {error.stack}
                </pre>
            </div>
        {/if}

        <!-- Navigation -->
        <div
            class="
            /* Minimal theme (default) */
            space-y-4
            
            /* Artistic theme overrides */
            artistic:space-y-6
        "
        >
            <button
                onclick={goHome}
                class="
                    /* Minimal theme (default) */
                    inline-flex items-center gap-2 px-6 py-3 bg-transparent text-text-secondary border border-neutral-300 rounded-none shadow-none hover:text-text-primary hover:bg-transparent transition-all duration-300
                    
                    /* Artistic theme overrides */
                    artistic:font-medium artistic:bg-primary artistic:text-text-light artistic:rounded-full artistic:shadow-md artistic:hover:scale-105 artistic:border-transparent
                "
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                </svg>
                Go Home
            </button>

            <p
                class="
                /* Minimal theme (default) */
                text-sm font-light text-text-tertiary
                
                /* Artistic theme overrides */
                artistic:font-normal artistic:text-text-secondary
            "
            >
                Or try navigating to a different page using the menu above.
            </p>
        </div>
    </div>
</main>
