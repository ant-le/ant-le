<script lang="ts">
    import type { MusicData } from '$lib/types/music' // Assuming MusicData is aliased or similar to BlogPost
    import { fade } from 'svelte/transition' // Used in some designs for animation

    let { post, onReadMore } = $props<{
        post: MusicData
        onReadMore: (post: MusicData) => void
    }>()
    let showPlayer = $state(false)
</script>

<article
    class="flex-shrink-0 w-80 md:w-[32rem] bg-primary-dark rounded-xl shadow-lg flex flex-col md:flex-row border border-neutral-600 font-display transition-all duration-300"
>
    <div class="relative w-full md:w-1/2 aspect-square flex-shrink-0">
        <div class="absolute inset-0 w-full h-full p-4">
            <div
                class="relative w-full h-full bg-neutral-800 rounded-lg border-2 border-neutral-900 flex items-center justify-center"
            >
                <div
                    class="absolute top-2 left-2 text-xs text-secondary font-bold"
                >
                    ANTI-SKIP
                </div>

                <div
                    class="relative w-3/5 aspect-square bg-bg-tertiary rounded-full border-4 border-neutral-600 p-1"
                >
                    <img
                        class="w-full h-full object-cover rounded-full"
                        src={post.image}
                        alt="Art for {post.title}"
                    />

                    {#if showPlayer}
                        <div
                            class="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm flex items-center justify-center rounded-full"
                            transition:fade
                        >
                            <div class="w-full h-full p-2 scale-90">
                                {@html post.iframe}
                            </div>
                        </div>
                    {/if}

                    <div
                        class="absolute inset-0 group"
                        class:pointer-events-none={showPlayer}
                    >
                        <div
                            role="button"
                            tabindex="0"
                            onclick={() => (showPlayer = true)}
                            onkeydown={() => (showPlayer = true)}
                            transition:fade={{ duration: 300 }}
                            class="w-full h-full flex
                            items-center justify-center bg-transparent group-hover:bg-bg-dark/50 rounded-full
                            transition-colors"
                        >
                            <svg
                                width="40"
                                height="40"
                                fill="currentColor"
                                class="text-accent-2 opacity-0 group-hover:opacity-100"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                                />
                            </svg>
                        </div>
                    </div>

                    {#if showPlayer}
                        <button
                            onclick={() => (showPlayer = false)}
                            class="absolute -top-2 -right-2 z-20 p-1 bg-bg-dark/50
                        rounded-full text-text-light"
                            aria-label="Close"
                            transition:fade
                        >
                            <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708-.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8l-4.646-5.354a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col flex-grow p-4 md:p-6 justify-between">
        <div class="text-left">
            <h3 class="font-bold text-lg md:text-xl text-text-primary">
                {post.title}
            </h3>
            <p class="text-sm text-text-secondary mt-1">{post.desc}</p>
        </div>
        <div
            class="flex items-center justify-between pt-4 mt-4 border-t border-neutral-700"
        >
            <div class="flex items-center gap-2">
                <div
                    class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-bg-dark font-bold text-xs"
                >
                    BASS
                </div>
                <div class="flex flex-wrap gap-1">
                    {#each post.labels as label}
                        <span
                            class="px-2 py-0.5 text-[10px] bg-primary text-text-light rounded"
                            >{label}</span
                        >
                    {/each}
                </div>
            </div>
            <button
                onclick={() => onReadMore(post)}
                class="text-sm font-bold text-accent-2 hover:underline
                flex-shrink-0">INFO</button
            >
        </div>
    </div>
</article>
