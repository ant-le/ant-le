<script lang="ts">
    import FriendCard from '$lib/components/cards/FriendCard.svelte'
    import { friendsData } from '$lib/types/friends'
</script>

<svelte:head>
    <title>Anton Lechuga | Home</title>
    <meta
        name="description"
        content="Personal website of Anton Lechuga - Scientist, Runner, and Music Enthusiast"
    />
</svelte:head>

<FriendCard post={friendsData[0]} />
