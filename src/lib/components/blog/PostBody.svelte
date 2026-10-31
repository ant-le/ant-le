<script lang="ts">
    import type { BlogPost } from '$lib/blog/posts'

    let { post }: { post: BlogPost } = $props()
</script>

{#each post.body as paragraph, index (`${post.slug}-${index}`)}
    <p>
        {paragraph}
        {#each post.sources.filter((source) => source.paragraph === index + 1) as source (source.href)}
            <!-- External research URLs do not use SvelteKit route resolution. -->
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
            <a class="underline underline-offset-4" href={source.href}
                >{source.label}</a
            >
        {/each}
    </p>
{/each}
