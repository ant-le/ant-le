<script lang="ts">
    export type Friend = {
        name: string
        role: string
        text: string
        image: string
    }

    let { friend }: { friend: Friend } = $props()
</script>

<article
    class="border-ink shadow-brutal-md grid min-h-80 w-full max-w-md grid-rows-[14rem_1fr] overflow-hidden border-4 bg-white"
>
    <img
        class="border-ink h-full w-full border-b-4 object-cover"
        src={friend.image}
        alt={friend.name}
        loading="lazy"
        decoding="async"
    />
    <div class="flex flex-col justify-between p-5">
        <p class="text-2xl leading-none font-black">
            &ldquo;{friend.text}&rdquo;
        </p>
        <div class="border-ink mt-8 border-t-4 pt-3">
            <p class="font-black uppercase">{friend.name}</p>
            <p class="text-brand-purple font-semibold">{friend.role}</p>
        </div>
    </div>
</article>
