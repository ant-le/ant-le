<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'

    let { image }: { image: string } = $props()
</script>

<div
    class="border-ink bg-brand-teal grid h-full min-h-[40vh] place-items-center border-b-4 p-4 lg:border-r-4 lg:border-b-0"
>
    <div
        class="border-ink bg-brand-red shadow-brutal-lg relative h-96 w-full max-w-md rotate-[-1deg] overflow-hidden border-4"
    >
        <img
            class="h-full w-full object-cover contrast-125 grayscale"
            src={image}
            alt="Anton Lechuga"
            decoding="async"
            fetchpriority="high"
        />
        <div
            class="border-ink bg-brand-orange absolute right-4 bottom-4 left-4 border-4 px-3 py-2 text-center text-xl font-black uppercase"
        >
            {m.hero_badge()}
        </div>
    </div>
</div>
