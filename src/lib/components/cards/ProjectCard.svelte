<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import { formatDate } from '$lib/utils'

    let { post, onReadMore } = $props<{
        post: BlogPost
        onReadMore: (post: BlogPost) => void
    }>()
</script>

<div
    class="relative h-56 w-full overflow-hidden rounded-3xl border border-bg-tertiary/70 bg-bg-secondary/90 p-1 font-display shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:h-60
    artistic:border-4 artistic:border-text-primary artistic:bg-accent-pink artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
>
    <div class="absolute top-2 left-3 flex gap-1.5">
        <div
            class="h-3 w-3 rounded-full bg-bg-tertiary/80 artistic:bg-text-primary/70"
        ></div>
        <div
            class="h-3 w-3 rounded-full bg-bg-tertiary/80 artistic:bg-text-primary/70"
        ></div>
        <div
            class="h-3 w-3 rounded-full bg-bg-tertiary/80 artistic:bg-text-primary/70"
        ></div>
    </div>

    <div class="p-6 pt-10 flex flex-col h-full">
        <div class="flex-grow">
            <p class="text-accent-cyan artistic:text-accent-yellow">
                <span class="text-text-secondary/70 artistic:text-text-light/80"
                    >@anton</span
                >:<span
                    class="text-text-secondary/60 artistic:text-text-light/70"
                    >~/projects</span
                >$ ./load-post.sh
            </p>
            <h3>
                {post.title}<span
                    class="inline-block w-2.5 h-[1.3rem] md:h-[1.6rem] bg-text-primary ml-1 animate-blink align-bottom"
                ></span>
            </h3>

            <div
                class="flex flex-wrap gap-x-4 gap-y-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
            >
                {#each post.labels as label}
                    <span
                        class="text-xs text-text-secondary/70 artistic:text-text-primary/80"
                        >--tag="{label}"</span
                    >
                {/each}
            </div>
        </div>

        <div
            class="flex justify-between items-center w-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500"
        >
            <span
                class="text-sm text-text-secondary/70 artistic:text-text-light/80"
            >
                {formatDate(post.creationDate)}
            </span>
            <button
                onclick={(e) => {
                    e.preventDefault()
                    onReadMore(post)
                }}
                class="text-sm text-accent-violet transition-colors duration-200 hover:underline artistic:text-text-primary"
            >
                [read_more]
            </button>
        </div>
    </div>
</div>

<style>
    @keyframes typing {
        from {
            width: 0;
        }

        to {
            width: 100%;
        }
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
