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
                group block h-full rounded-xl max-w-3xs sm:w-full
                border border-transparent hover:border-neutral-200
                transition-colors duration-300
                artistic:bg-primary artistic:hover:border-accent/30
           "
>
    <article class="h-full flex flex-col">
        <div class="pt-8 h-32 w-full overflow-hidden rounded-t-xl">
            <img
                src={post.image}
                alt="Post"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div class="p-4 flex-grow flex flex-col">
            <h3
                class="font-bold text-lg text-text-primary artistic:text-text-light"
            >
                {post.title}
            </h3>
            <p
                class="mt-2 line-clamp-2 text-sm text-text-secondary artistic:text-text-light/80 flex-grow"
            >
                {post.desc}
            </p>
            <div
                class="mt-8 mb-4 pt-8 flex items-center justify-between border-t border-text-primary"
            >
                <div class="text-accent-2/80">
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
                <p
                    class="font-mono text-xs font-bold text-text-tertiary artistic:text-accent-2"
                >
                    {kmText}
                </p>
            </div>
        </div>
    </article>
</button>
