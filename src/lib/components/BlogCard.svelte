<script lang="ts">
    import type { BlogPost } from '$lib/types'
    import { formatDate } from '$lib/utils'

    let {
        post,
        className = '',
        onReadMore,
    } = $props<{
        post: BlogPost
        className?: string
        onReadMore?: (post: BlogPost) => void
    }>()

    function handleReadMore(event: MouseEvent) {
        event.preventDefault()
        if (onReadMore) {
            onReadMore(post)
        }
    }
</script>

<div
    class="
    /* Minimal theme (default) */
    flex flex-col gap-3 p-4 bg-transparent border border-neutral-200 shadow-none transition-all duration-300 rounded-lg h-full /* Artistic theme overrides */
    artistic:p-6 artistic:bg-gradient-to-br artistic:from-bg-secondary artistic:to-primary/10 artistic:rounded-xl artistic:shadow-lg artistic:hover:shadow-xl artistic:border-2 artistic:border-primary/30 artistic:hover:border-accent artistic:transition-all artistic:duration-500 artistic:hover:scale-105 artistic:backdrop-blur-sm {className}
"
>
    <img
        src={post.image}
        alt={post.title}
        class="w-full h-48 object-cover rounded-lg artistic:block hidden artistic:rounded-xl artistic:shadow-md artistic:border-2 artistic:border-accent/20"
        loading="lazy"
    />
    <div class="flex flex-col space-y-3 flex-1">
        <h3
            class="
            /* Minimal theme (default) */
            text-lg font-normal text-text-primary line-clamp-2
            
            /* Artistic theme overrides */
            artistic:font-semibold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse
        "
        >
            {post.title}
        </h3>
        <div class="flex flex-wrap gap-2 mb-2">
            {#each post.labels as label}
                <span
                    class="
                    /* Minimal theme (default) */
                    px-3 py-1.5 text-xs bg-transparent text-text-secondary border border-neutral-200 rounded-full font-light
                    
                    /* Artistic theme overrides */
                    artistic:rounded-full artistic:bg-gradient-to-r artistic:from-accent artistic:to-accent-2 artistic:text-text-light artistic:border-transparent artistic:shadow-md artistic:font-bold artistic:animate-pulse artistic:hover:scale-110 artistic:transition-all artistic:duration-300
                "
                >
                    {label}
                </span>
            {/each}
        </div>
        <div class="flex justify-between items-center mt-auto pt-2">
            <span
                class="
                /* Minimal theme (default) */
                text-sm font-light text-text-tertiary
                
                /* Artistic theme overrides */
                artistic:font-normal artistic:text-secondary artistic:animate-pulse
            "
            >
                {formatDate(post.creationDate)}
            </span>
            <button
                onclick={handleReadMore}
                class="
                    /* Minimal theme (default) */
                    inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-transparent text-text-secondary border border-neutral-200 rounded-md hover:text-text-primary hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200
                    
                    /* Artistic theme overrides */
                    artistic:font-bold artistic:bg-gradient-to-r artistic:from-secondary artistic:to-accent artistic:text-text-light artistic:rounded-full artistic:shadow-lg artistic:hover:shadow-xl artistic:hover:scale-110 artistic:no-underline artistic:px-4 artistic:py-2 artistic:transition-all artistic:duration-300 artistic:animate-pulse artistic:hover:animate-bounce artistic:border-transparent
                "
            >
                Read More
                <svg
                    class="w-3 h-3 artistic:w-4 artistic:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
</div>
