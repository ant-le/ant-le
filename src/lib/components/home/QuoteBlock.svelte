<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'
</script>

<blockquote
    class="border-ink bg-ink font-display text-paper border-b-4 px-5 py-10 text-center text-3xl leading-none font-black uppercase md:px-20 md:text-7xl"
>
    <span class="text-brand-red">&ldquo;</span>{m.quote_text()}<span
        class="text-brand-red">&rdquo;</span
    >
    <cite class="text-brand-orange mt-5 block text-base not-italic md:text-xl"
        >{m.quote_by()}</cite
    >
</blockquote>
