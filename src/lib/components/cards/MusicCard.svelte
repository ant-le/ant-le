<script lang="ts">
    import type { MusicData } from '$lib/types/music'
    import { fade } from 'svelte/transition'

    let { post, onReadMore } = $props<{
        post: MusicData
        onReadMore: (post: MusicData) => void
    }>()
    let showPlayer = $state(false)
</script>

<article
    class="relative flex-shrink-0 w-65 md:w-[32rem] rounded-3xl border border-bg-tertiary/60 bg-bg-secondary/85 shadow-xl transition-all duration-300 backdrop-blur-sm flex flex-col md:flex-row
    artistic:border-4 artistic:border-text-primary artistic:bg-accent-violet artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
>
    {#if showPlayer}
        <div
            class="absolute inset-0 z-10 flex items-center justify-center rounded-3xl border border-bg-tertiary/60 bg-bg-secondary/90 p-4 backdrop-blur-md
            artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow"
            transition:fade
        >
            <div class="w-full h-full p-2">
                {@html post.iframe}
            </div>

            <button
                onclick={() => (showPlayer = false)}
                class="absolute top-4 right-4 z-20 rounded-full bg-bg-tertiary/50 p-1 text-text-primary transition-colors duration-200 hover:bg-bg-tertiary/80 artistic:bg-text-primary artistic:text-text-light artistic:hover:bg-accent-pink"
                aria-label="Close"
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
        </div>
    {/if}

    <div class="relative w-full md:w-1/2 aspect-square flex-shrink-0">
        <div class="absolute inset-0 w-full h-full p-4">
            <div
                class="relative flex h-full w-full items-center justify-center rounded-2xl border border-bg-tertiary/60 bg-bg-primary/90"
            >
                <div
                    class="absolute left-3 top-3 text-xs font-semibold tracking-wide text-text-secondary/70 artistic:text-text-primary/80"
                >
                    ANTI-SKIP
                </div>

                <div
                    class="relative aspect-square w-3/5 rounded-full border-4 border-bg-tertiary/60 bg-bg-tertiary p-1 artistic:border-text-primary artistic:bg-accent-pink"
                >
                    <img
                        class="w-full h-full object-cover rounded-full"
                        src={post.image}
                        alt="Art for {post.title}"
                    />

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
                            class="flex h-full w-full items-center justify-center rounded-full bg-transparent transition-colors
                            group-hover:bg-bg-tertiary/70 artistic:group-hover:bg-text-primary/60"
                        >
                            <svg
                                width="40"
                                height="40"
                                fill="currentColor"
                                class="opacity-0 text-accent-cyan group-hover:opacity-100 artistic:text-text-primary"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-grow flex-col justify-between p-4 md:p-6">
        <div class="text-left">
            <h3>
                {post.piece}
            </h3>
            <p class="text-sm text-text-secondary mt-1">{post.artist}</p>
        </div>
        <div
            class="mt-4 flex items-center justify-between border-t border-bg-tertiary/60 pt-4 artistic:border-t-4 artistic:border-text-primary"
        >
            <div class="flex items-center gap-2">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan text-xs font-semibold text-accent-yellow artistic:bg-text-primary"
                >
                    BASS
                </div>
                <div class="flex flex-wrap gap-1">
                    {#each post.labels as label}
                        <span
                            class="rounded px-2 py-0.5 text-[10px] bg-accent-orange artistic:bg-text-primary text-accent-yellow"
                            >{label}</span
                        >
                    {/each}
                </div>
            </div>
            <button
                onclick={() => onReadMore(post)}
                class="flex-shrink-0 text-sm font-semibold text-accent-violet transition-colors duration-200 hover:underline artistic:text-text-primary"
            >
                INFO
            </button>
        </div>
    </div>
</article>
