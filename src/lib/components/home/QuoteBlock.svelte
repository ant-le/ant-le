<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'
</script>

<blockquote
    class="border-b-4 border-ink bg-ink px-5 py-10 text-center font-display text-3xl font-black uppercase leading-none text-paper md:px-20 md:text-7xl"
>
    <span class="text-brand-red">&ldquo;</span>{m.quote_text()}<span
        class="text-brand-red">&rdquo;</span
    >
    <cite class="mt-5 block text-base not-italic text-brand-orange md:text-xl"
        >{m.quote_by()}</cite
    >
</blockquote>
