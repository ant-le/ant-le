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
                inline-flex items-center justify-center w-30 h-30 rounded-full bg-transparent border-2 border-neutral-300 transition-all duration-300 shadow-none mb-8
                artistic:bg-gradient-to-br artistic:from-primary-light artistic:to-secondary artistic:border-neutral-200 artistic:animate-pulse artistic:shadow-lg artistic:mb-12
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

        <h1
            class="
                text-4xl font-normal text-text-primary mb-4 tracking-wide
                artistic:text-5xl artistic:font-bold artistic:bg-gradient-to-r artistic:from-primary artistic:to-secondary artistic:bg-clip-text artistic:text-transparent artistic:animate-pulse artistic:tracking-normal
            "
        >
            {status}
        </h1>

        <p
            class="
                text-lg font-light text-text-secondary mb-8 tracking-wide
                artistic:text-xl artistic:font-normal artistic:tracking-normal artistic:mb-12
            "
        >
            {error?.message ?? `Page not found.`}
        </p>

        {#if status !== 404 && error?.stack}
            <div
                class="
                    mb-8 p-4 bg-neutral-100 rounded-md text-left border border-neutral-300
                    artistic:mb-12 artistic:p-6 artistic:bg-bg-secondary artistic:rounded-lg artistic:border-neutral-200 artistic:shadow-md
                "
            >
                <h3
                    class="
                        text-sm font-normal text-text-primary mb-2
                        artistic:font-semibold
                    "
                >
                    Error Details:
                </h3>
                <pre
                    class="
                        text-xs font-light text-text-tertiary whitespace-pre-wrap
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
                inline-flex items-center gap-2 px-6 py-3 bg-transparent text-text-secondary border border-neutral-300
                rounded-none shadow-none hover:text-text-primary hover:bg-transparent transition-all duration-300
                artistic:font-medium artistic:bg-primary artistic:text-text-light artistic:rounded-full
                artistic:shadow-md artistic:hover:scale-105 artistic:border-transparent
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
                class="text-sm font-light text-text-tertiary artistic:font-normal artistic:text-text-secondary"
            >
                Or try navigating to a different page using the menu above.
            </p>
        </div>
    </div>
</main>
