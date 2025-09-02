<script lang="ts">
    import PageHeader from '$lib/components/PageHeader.svelte'
</script>

<svelte:head>
    <title>Music - Anton Lechuga</title>
    <meta
        name="description"
        content="Music projects and DJ sets by Anton Lechuga"
    />
</svelte:head>

<div
    class="
        /* Minimal theme (default) */
        max-w-4xl mx-auto px-4
        
        /* Artistic theme overrides */
        artistic:max-w-6xl
    "
>
    <PageHeader
        title="Music"
        subtitle="Exploring downtempo, ambient techno, and the art of sound."
    />

    <!-- Coming Soon Section -->
    <section
        class="
            /* Minimal theme (default) */
            text-center space-y-6
            
            /* Artistic theme overrides */
            artistic:text-center artistic:space-y-8
        "
    >
        <h2
            class="
                /* Minimal theme (default) */
                text-3xl font-normal text-text-primary mb-4
                
                /* Artistic theme overrides */
                artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
            "
        >
            Coming Soon
        </h2>

        <div
            class="
                /* Minimal theme (default) */
                space-y-4 max-w-2xl mx-auto grid grid-cols-2 gap-5
                
                /* Artistic theme overrides */
                artistic:space-y-6 artistic:max-w-3xl artistic:mx-auto
            "
        >
            <div
                class="
                    /* Minimal theme (default) */
                    bg-transparent border border-neutral-300 shadow-none rounded-lg p-6 transition-all duration-300
                    
                    /* Artistic theme overrides */
                    artistic:bg-bg-secondary artistic:shadow-md artistic:border-neutral-200 artistic:hover:shadow-lg
                "
            >
                <h3
                    class="
                        /* Minimal theme (default) */
                        text-xl font-normal text-text-primary mb-3
                        
                        /* Artistic theme overrides */
                        artistic:font-semibold
                    "
                >
                    DJ Sets
                </h3>
                <p
                    class="
                        /* Minimal theme (default) */
                        text-sm font-light text-text-secondary leading-relaxed
                        
                        /* Artistic theme overrides */
                        artistic:font-normal
                    "
                >
                    Techno and downtempo mixes.
                </p>
            </div>

            <div
                class="
                    /* Minimal theme (default) */
                    bg-transparent border border-neutral-300 shadow-none rounded-lg p-6 transition-all duration-300
                    
                    /* Artistic theme overrides */
                    artistic:bg-bg-secondary artistic:shadow-md artistic:border-neutral-200 artistic:hover:shadow-lg
                "
            >
                <h3
                    class="
                        /* Minimal theme (default) */
                        text-xl font-normal text-text-primary mb-3
                        
                        /* Artistic theme overrides */
                        artistic:font-semibold
                    "
                >
                    Music Production
                </h3>
                <p
                    class="
                        /* Minimal theme (default) */
                        text-sm font-light text-text-secondary leading-relaxed
                        
                        /* Artistic theme overrides */
                        artistic:font-normal
                    "
                >
                    Compositions and experimental sound design projects.
                </p>
            </div>
        </div>
    </section>
</div>
