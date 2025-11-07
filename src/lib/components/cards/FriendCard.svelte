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
    bg-accent-green/30 transition-all border border-accent-yellow/30
    duration-300 ease-in-out relative overflow-hidden h-full flex flex-col w-full
    max-w-2xs shadow-lg
    {className}
   "
>
    <div class="grid grid-rows-7 h-full items-center">
        <blockquote
            class="
                    text-text-secondary
                    leading-relaxed text-sm text-center 
                    font-normal tracking-wide line-clamp-4
                    row-span-4 overflow-hidden px-3
               "
        >
            {post.text}
        </blockquote>
        <div class="flex items-center p-5 border border-accent-yellow/30 row-span-3 h-28
            bg-accent-green/10">
            <img
                src={post.image}
                alt={post.name}
                class="
                    w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2
                    flex-shrink-0 border-text-primary artistic:shadow-lg
               "
                loading="lazy"
            />
            <div class="flex-1 ml-4 overflow-hidden">
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
