<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    import { formatDate } from '$lib/utils'

    let { post, onReadMore } = $props<{
        post: BlogPost
        onReadMore: (post: BlogPost) => void
    }>()
</script>



<div
    class="relative flex flex-col p-4 md:p-6 bg-bg-surface rounded-lg
    overflow-hidden group border border-primary-light/30 h-full"
>
    <div class="absolute inset-0 z-0 opacity-20"></div>
    <div
        class="absolute inset-0 z-10 rounded-lg opacity-0
        group-hover:opacity-100 transition-opacity duration-500"
        style="background: radial-gradient(circle at center, 
            transparent, var(--color-primary-dark));"
    ></div>

    <div class="relative z-20 flex flex-col h-full">
        <h4 class="group-hover:text-text-light/90">
            {post.title}
        </h4>

        <div class="flex justify-between items-center mt-auto pt-4
            transition-colors duration-300
            ">
            <h7 class="group-hover:text-text-light/80">
                {formatDate(post.creationDate)}
            </h7>
            <button
                onclick={(e) => {
                    e.preventDefault()
                    onReadMore(post)
                }}
                class="px-4 py-2 text-sm rounded-full bg-bg-surface 
                border border-primary-light/30 backdrop-blur-sm
                text-primary-light"
                aria-label="Read more about {post.title}"
            >
                Explore
            </button>
        </div>
    </div>
</div>
