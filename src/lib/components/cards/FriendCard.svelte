<script lang="ts">
    import type { FriendsData } from '$lib/types/friends'

    interface Props {
        post: FriendsData
        className?: string
    }

    let { post, className = '' }: Props = $props()
</script>

<div
    class="
    bg-bg-primary transition-all border border-bg-tertiary/60
    duration-300 ease-in-out relative overflow-hidden h-full flex flex-col w-full
    max-w-xs artistic:border-4 artistic:border-text-primary artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]
	     {className}
   "
>
    <div class="grid grid-rows-7 h-full items-center">
        <blockquote
            class="
                    text-text-secondary
	                     leading-relaxed text-sm text-center md:text-base
                    font-normal tracking-wide line-clamp-4
                    row-span-4 overflow-hidden px-4 py-2
	                "
        >
            {post.text}
        </blockquote>
        <div
            class="flex items-center gap-4 p-6 bg-bg-tertiary artistic:bg-accent-yellow row-span-3 min-h-32"
        >
            <img
                src={post.image}
                alt={post.name}
                class="
                    w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2
                    flex-shrink-0 border-text-primary artistic:shadow-[4px_4px_0px_rgba(0,0,0,1)]
               "
                loading="lazy"
            />
            <div class="flex-1 overflow-hidden">
                <h5 class="text-text-primary">{@html post.name}</h5>
                <p
                    class="
	                         text-xs sm:text-sm m-0 font-normal tracking-wide
                    text-text-primary
                   "
                >
                    {post.role}
                </p>
            </div>
        </div>
    </div>
</div>
