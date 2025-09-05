<script lang="ts">
    import Loader from '$lib/components/Loader.svelte'

    let {
        loading = false,
        title = 'There is nothing here',
        message = 'I am still working on putting all together, please come back in a few days...',
    }: { loading?: boolean; title?: string; message?: string } = $props()
</script>

<div class="flex flex-col items-center justify-center text-center px-4 py-8">
    {#if loading}
        <Loader width="48" height="48" />
        <h3
            class="mt-4 text-xl sm:text-2xl font-semibold text-text-primary artistic:text-text-primary"
        >
            Loading...
        </h3>
    {:else}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-12 h-12 text-text-secondary mb-4 artistic:text-accent"
        >
            <path
                d="M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7l-3 3-3-3z"
            />
        </svg>
        <h3
            class="text-xl sm:text-2xl font-semibold text-text-primary artistic:text-text-primary"
        >
            {title}
        </h3>
        <p
            class="text-sm sm:text-base text-text-secondary mt-2 artistic:text-text-secondary"
        >
            {message}
        </p>
    {/if}
</div>
