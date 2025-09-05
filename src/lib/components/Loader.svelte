<script>
    // You can add props here for customization if needed, e.g., size or color.
    let { width, height } = $props()
</script>

<div role="status" aria-live="polite">
    <svg {width} {height} viewBox="0 0 64 48">
        <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            class="fill-none stroke-text-secondary stroke-[3]"
            stroke-linecap="round"
            stroke-linejoin="round"
        />

        <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            class="fill-none stroke-text-primary stroke-[3] animate-heartbeat"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="stroke-dasharray: 48, 144; stroke-dashoffset: 192;"
        />
    </svg>
    <span class="sr-only">Loading...</span>
</div>
