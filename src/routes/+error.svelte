<script lang="ts">
    import { goto } from '$app/navigation'
    import { resolve } from '$app/paths'

    export let data: { status: number; error: Error }

    $: status = data.status
    $: error = data.error
</script>

<svelte:head>
    <title>Error | Anton Lechuga</title>
</svelte:head>

<main class="flex items-center justify-center py-16 artistic:py-20">
    <div class="text-center max-w-md mx-auto px-4 artistic:max-w-lg">
        <div
            class="
                inline-flex items-center justify-center w-30 h-30 rounded-full border border-bg-tertiary/60 bg-bg-secondary/70 transition-all duration-300 shadow-none mb-8 backdrop-blur-sm
                artistic:bg-gradient-to-br artistic:from-accent-yellow artistic:to-accent-pink artistic:border-text-primary/60 artistic:animate-pulse artistic:shadow-[0_16px_38px_rgba(0,0,0,0.35)] artistic:mb-12
            "
        >
            <svg
                class="w-16 h-16 text-text-secondary artistic:w-20 artistic:h-20 artistic:text-text-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                >
                </path>
            </svg>
        </div>

        <h1>
            {status}
        </h1>

        <p
            class="
                text-lg font-normal text-text-secondary mb-8 tracking-wide
                artistic:text-xl artistic:font-normal artistic:tracking-normal artistic:mb-12
            "
        >
            {error?.message ?? `Page not found.`}
        </p>

        {#if status !== 404 && error?.stack}
            <div
                class="
                    mb-8 rounded-2xl border border-bg-tertiary/60 bg-bg-secondary/70 p-4 text-left shadow-sm transition-colors duration-300
                    artistic:mb-12 artistic:p-6 artistic:bg-accent-green/55 artistic:border-text-primary/50 artistic:shadow-[0_12px_32px_rgba(0,0,0,0.3)]
                "
            >
                <h3>
                    Error Details:
                </h3>
                <pre
                    class="
                        text-xs font-normal text-text-secondary/70 whitespace-pre-wrap
                        artistic:font-normal artistic:text-text-secondary
                    ">
                {error.stack}
            </pre>
            </div>
        {/if}

        <div class="space-y-4 artistic:space-y-6">
            <button
                onclick={() => goto(resolve('/'))}
                class="
                inline-flex items-center gap-2 rounded-full border border-bg-tertiary/60 px-6 py-3 text-text-secondary transition-all duration-300
                bg-bg-secondary/60 hover:bg-bg-tertiary/60 hover:text-text-primary
                artistic:font-semibold artistic:bg-accent-orange/70 artistic:text-text-primary artistic:shadow-[0_10px_30px_rgba(0,0,0,0.28)] artistic:hover:scale-105 artistic:border-transparent
                "
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    >
                    </path>
                </svg>
                Go Home
            </button>

            <p
                class="text-sm font-normal text-text-secondary/70 artistic:font-normal artistic:text-text-secondary"
            >
                Or try navigating to a different page using the menu above.
            </p>
        </div>
    </div>
</main>
