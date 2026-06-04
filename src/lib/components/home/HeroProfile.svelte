<script lang="ts">
    import { m } from '$lib/paraglide/messages.js'

    let { image }: { image: string } = $props()
</script>

<div
    class="grid h-full min-h-[40vh] place-items-center border-b-4 border-ink bg-brand-teal p-4 lg:border-b-0 lg:border-r-4"
>
    <div
        class="relative h-96 w-full max-w-md rotate-[-1deg] overflow-hidden border-4 border-ink bg-brand-red shadow-brutal-lg"
    >
        <img
            class="h-full w-full object-cover grayscale contrast-125"
            src={image}
            alt="Anton Lechuga"
        />
        <div
            class="absolute bottom-4 left-4 right-4 border-4 border-ink bg-brand-orange px-3 py-2 text-center text-xl font-black uppercase"
        >
            {m.hero_badge()}
        </div>
    </div>
</div>
