<script lang="ts">
    import type { FriendsData } from '$lib/types'

    interface Props {
        post: FriendsData
        className?: string
    }

    let { post, className = '' }: Props = $props()
</script>

<div
    class="
    /* Minimal theme (default) */
    bg-bg-secondary rounded-[25px] shadow-md p-6 transition-all duration-300 ease-in-out relative overflow-hidden h-full flex flex-col max-w-3xs
    /* Artistic theme overrides */
    artistic:bg-gradient-to-br artistic:from-primary artistic:to-secondary artistic:shadow-lg artistic:rounded-[30px] artistic:animate-[friendCardFloat_5s_ease-in-out_infinite]
    {className}
"
>
    <div class="flex flex-col flex-1">
        <div class="relative flex items-center flex-1 mb-4">
            <svg
                class="
                /* Minimal theme (default) */
                absolute -top-2 -left-2 w-8 h-8 text-text-tertiary opacity-60
                
                /* Artistic theme overrides */
                artistic:absolute artistic:-top-2 artistic:-left-2 artistic:w-8 artistic:h-8 artistic:text-accent artistic:animate-[quoteIconPulse_3s_ease-in-out_infinite]
            "
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
            </svg>
            <blockquote
                class="
                /* Minimal theme (default) */
                text-text-secondary italic leading-relaxed text-base pl-6 m-0 font-light tracking-wide line-clamp-4
                /* Artistic theme overrides */
                artistic:text-text-primary artistic:font-medium artistic:animate-[textFadeIn_1s_ease-out]
            "
            >
                {post.text}
            </blockquote>
        </div>

        <div
            class="
            /* Minimal theme (default) */
            flex items-center gap-4 pt-4 border-t border-neutral-200
            
            /* Artistic theme overrides */
            artistic:border-t-accent artistic:border-t-2
        "
        >
            <img
                src={post.image}
                alt={post.name}
                class="
                    /* Minimal theme (default) */
                    w-12 h-12 rounded-full object-cover border-2 border-neutral-200 flex-shrink-0
                    
                    /* Artistic theme overrides */
                    artistic:border-3 artistic:border-accent artistic:shadow-lg artistic:animate-[imageFloat_3s_ease-in-out_infinite]
                "
                loading="lazy"
            />
            <div class="flex-1">
                <h3
                    class="
                    /* Minimal theme (default) */
                    text-lg font-normal text-text-primary mb-1 tracking-wider
                    
                    /* Artistic theme overrides */
                    artistic:font-bold artistic:bg-gradient-to-r artistic:from-text-primary artistic:to-accent-2 artistic:bg-clip-text artistic:text-transparent
                "
                >
                    {post.name}
                </h3>
                <p
                    class="
                    /* Minimal theme (default) */
                    text-sm text-text-tertiary italic m-0 font-light tracking-wide min-h-10
                    
                    /* Artistic theme overrides */
                    artistic:text-accent artistic:font-medium artistic:animate-[roleGlow_2s_ease-in-out_infinite_alternate]
                "
                >
                    {post.role}
                </p>
            </div>
        </div>
    </div>
</div>
