<script lang="ts">
    import { fade } from 'svelte/transition'
    import type { MusicData } from '$lib/types/music'

    let { post, onReadMore } = $props<{
        post: MusicData
        onReadMore: (post: MusicData) => void
    }>()
    // Reactive state to control the visibility of the music player
    let showPlayer = $state(false)
</script>

<article
    class="
        flex flex-col h-full rounded-xl overflow-hidden shadow-lg transition-shadow duration-300
        bg-bg-tertiary artistic:shadow-xl artistic:hover:shadow-accent/20
        w-full max-w-48 sm:max-w-3xs mx-auto
    "
>
    <div class="relative flex-shrink-0 h-24 sm:h-32 w-full">
        <!-- The album art is now the persistent background. -->
        <img
            class="absolute inset-0 w-full h-full object-cover"
            src={post.image}
            alt="Album art for {post.title}"
        />

        {#if showPlayer}
            <!-- When showPlayer is true, we display a layer on top of the image -->
            <div
                class="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center"
                transition:fade={{ duration: 200 }}
            >
                <div class="music-player-container w-full h-full p-4">
                    {@html post.iframe}
                </div>
            </div>
        {/if}

        <!-- Interactive overlay for the Play/Close button. -->
        <div
            class="absolute inset-0 group"
            class:pointer-events-none={showPlayer}
            role="button"
            tabindex="0"
            onclick={() => (showPlayer = true)}
            onkeydown={(e) => e.key === 'Enter' && (showPlayer = true)}
        >
            <div
                class="w-full h-full bg-transparent bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center"
            >
                <div
                    class="text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        class="bi bi-play-circle-fill drop-shadow-lg"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Close Button: Appears only when the player is active -->
        {#if showPlayer}
            <button
                onclick={() => (showPlayer = false)}
                class="absolute top-2 right-2 z-20 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/80
            transition-all"
                aria-label="Close music player"
                transition:fade
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                </svg>
            </button>
        {/if}
    </div>

    <!-- Text content below the image/player -->
    <div class="p-4 sm:p-5 flex-grow flex flex-col">
        <!-- 
            Responsive Changes:
            - p-4 sm:p-5: Adjusts padding for mobile and larger screens.
        -->
        <a href={post.post} class="hover:text-accent-2 transition-colors">
            <h3
                class="font-bold truncate text-base sm:text-lg text-text-primary artistic:text-text-light"
            >
                <!-- 
                    Responsive Changes:
                    - text-base sm:text-lg: Adjusts font size for better readability.
                -->
                {post.title}
            </h3>
        </a>
        <p
            class="text-xs sm:text-sm text-text-secondary artistic:text-text-light/80"
        >
            <!-- 
                Responsive Changes:
                - text-xs sm:text-sm: Adjusts font size for better readability.
            -->
            {post.desc}
        </p>

        <!-- Labels -->
        <div
            class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-200 artistic:border-accent/30"
        >
            {#each post.labels as label}
                <span
                    class="px-2 py-1 text-xs font-semibold bg-accent/20 text-accent-2 rounded-full"
                >
                    {label}
                </span>
            {/each}
        </div>
    </div>
</article>
