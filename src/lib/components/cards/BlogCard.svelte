<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import { formatDate } from '$lib/utils'

    let { post, onReadMore } = $props<{
        post: BlogPost
        onReadMore: (post: BlogPost) => void
    }>()
</script>

<div
    class="relative flex flex-col p-4 md:p-6 bg-bg-dark rounded-lg overflow-hidden group border border-neutral-700 h-full"
>
    <div class="absolute inset-0 z-0 opacity-20"></div>
    <div
        class="absolute inset-0 z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style="background: radial-gradient(circle at center, transparent, var(--color-primary-dark));"
    ></div>

    <div class="relative z-20 flex flex-col h-full">
        <h3 class="text-lg md:text-xl font-bold text-text-primary">
            {post.title}
        </h3>

        <div class="flex justify-between items-center mt-auto pt-4">
            <span class="text-sm font-mono text-secondary">
                {formatDate(post.creationDate)}
            </span>
            <button
                onclick={(e) => {
                    e.preventDefault()
                    onReadMore(post)
                }}
                class="px-4 py-2 text-sm rounded-full text-text-light bg-secondary/20 border border-secondary/50
                backdrop-blur-sm group-hover:bg-secondary group-hover:text-text-light transition-colors duration-300"
                aria-label="Read more about {post.title}"
            >
                Explore
            </button>
        </div>
    </div>
</div>
