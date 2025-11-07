<script lang="ts">
    import type { BlogPost } from '$lib/types/blog'
    let {
        post,
        onReadMore,
        index,
        total,
    }: {
        post: BlogPost
        onReadMore: (post: BlogPost) => void
        index: number
        total: number
    } = $props()
    const progress = $derived(index / (total - 1))
    const startY = $derived(10 + Math.sin(index / 2) * 5)
    const endY = $derived(10 + Math.sin((index + 1) / 2) * 5)
    const kmText = $derived(
        index === 0
            ? 'START'
            : index === total - 1
              ? 'FINISH'
              : `${(42.2 * progress).toFixed(1)} KM`
    )
</script>

<button
    onclick={() => onReadMore(post)}
    class="
            group block h-full max-w-3xs sm:w-full overflow-hidden rounded-2xl border border-bg-tertiary/60 bg-bg-secondary/85 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
            artistic:border-accent-yellow/30 artistic:bg-accent-orange/65 artistic:shadow-[0_12px_32px_rgba(0,0,0,0.35)] artistic:hover:-translate-y-1.5
      "
>
    <article class="flex h-full flex-col">
        <div class="h-32 w-full overflow-hidden">
            <img
                src={post.image}
                alt="Post"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div class="flex flex-grow flex-col p-4">
            <h4>
                {post.title}
            </h4>
            <h7
                class="mt-2 line-clamp-2 flex-grow"
            >
                {post.desc}
            </h7>
            <div
                class="mt-8 mb-4 flex items-center justify-between border-t border-bg-tertiary/60 pt-8 artistic:border-text-primary/40"
            >
                <div class="text-accent-yellow">
                    <svg
                        width="100"
                        height="20"
                        viewBox="0 0 100 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M-1 {startY} C 33 {startY}, 66 {endY}, 101 {endY}"
                            class="stroke-current"
                            stroke-width={index === total - 1 ? 3 : 2}
                            stroke-dasharray={index === 0 || index === total - 1
                                ? 'none'
                                : '3 3'}
                        />

                        <circle
                            cx={progress * 100}
                            cy={10 + Math.sin((index + progress) / 2) * 5}
                            r="3"
                            class="fill-current"
                        />
                    </svg>
                </div>
                <p class="text-xs text-accent-yellow">
                    {kmText}
                </p>
            </div>
        </div>
    </article>
</button>
