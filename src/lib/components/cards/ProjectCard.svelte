<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import { formatDate } from '$lib/utils'

    let { post, onReadMore } = $props<{
        post: BlogPost
        onReadMore: (post: BlogPost) => void
    }>()
</script>

<div
    class="relative font-mono bg-neutral-900 rounded-lg h-56 md:h-60 overflow-hidden group p-1 border border-neutral-700"
>
    <div class="absolute top-2 left-3 flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-neutral-600"></div>
        <div class="w-3 h-3 rounded-full bg-neutral-600"></div>
        <div class="w-3 h-3 rounded-full bg-neutral-600"></div>
    </div>

    <div class="p-6 pt-10 flex flex-col h-full">
        <div class="flex-grow">
            <p class="text-accent-2">
                <span class="text-primary-light">user@gemini</span>:<span
                    class="text-secondary">~/posts</span
                >$ ./load-post.sh
            </p>
            <h3
                class="text-xl md:text-2xl font-bold text-text-primary mt-2 line-clamp-2 whitespace-nowrap overflow-hidden typing-effect group-hover:animate-typing"
            >
                {post.title}
                <span
                    class="inline-block w-2.5 h-[1.3rem] md:h-[1.6rem] bg-text-primary ml-1 animate-blink align-bottom"
                ></span>
            </h3>

            <div
                class="flex flex-wrap gap-x-4 gap-y-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
            >
                {#each post.labels as label}
                    <span class="text-xs text-neutral-300">--tag="{label}"</span
                    >
                {/each}
            </div>
        </div>

        <div
            class="flex justify-between items-center w-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500"
        >
            <span class="text-sm text-neutral-500">
                {formatDate(post.creationDate)}
            </span>
            <button
                onclick={(e) => {
                    e.preventDefault()
                    onReadMore(post)
                }}
                class="text-sm text-accent hover:underline"
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
    .animate-typing {
        /* Adjust animation duration based on title length if you want */
        animation:
            typing 2.5s steps(40, end),
            blink 0.75s step-end infinite;
    }
</style>
