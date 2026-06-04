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
    class="grid min-h-80 w-full max-w-md grid-rows-[14rem_1fr] overflow-hidden border-4 border-ink bg-white shadow-brutal-md"
>
    <img
        class="h-full w-full border-b-4 border-ink object-cover"
        src={friend.image}
        alt={friend.name}
    />
    <div class="flex flex-col justify-between p-5">
        <p class="text-2xl font-black leading-none">
            &ldquo;{friend.text}&rdquo;
        </p>
        <div class="mt-8 border-t-4 border-ink pt-3">
            <p class="font-black uppercase">{friend.name}</p>
            <p class="font-semibold text-brand-purple">{friend.role}</p>
        </div>
    </div>
</article>
