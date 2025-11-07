<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import { formatDate } from '$lib/utils'

    let { post, onReadMore } = $props<{
        post: BlogPost
        onReadMore: (post: BlogPost) => void
    }>()
</script>



<div
    class="group relative flex h-full flex-col overflow-hidden border border-bg-tertiary/60 bg-bg-secondary/80 p-4 shadow-md transition-colors duration-300 md:p-6
    artistic:border-text-primary artistic:bg-accent-cyan/10 artistic:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
>
    <div class="absolute inset-0 z-0 opacity-20"></div>
    <div
        class="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style="background: radial-gradient(circle at center, transparent, var(--color-accent-yellow));"
    ></div>

    <div class="relative z-20 flex flex-col h-full">
        <h4 class="transition-colors duration-200 group-hover:text-text-primary artistic:group-hover:text-text-light">
            {post.title}
        </h4>

        <div class="mt-auto flex items-center justify-between pt-4 transition-colors duration-300">
            <h7 class="transition-colors duration-200 group-hover:text-text-primary artistic:group-hover:text-text-light">
                {formatDate(post.creationDate)}
            </h7>
            <button
                onclick={(e) => {
                    e.preventDefault()
                    onReadMore(post)
                }}
                class="border border-bg-tertiary/60 px-4 py-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary
                artistic:border-text-primary artistic:bg-white/20 artistic:text-text-primary artistic:hover:bg-text-primary/20"
                aria-label="Read more about {post.title}"
            >
                Explore
            </button>
        </div>
    </div>
</div>
