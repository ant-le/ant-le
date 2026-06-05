<script lang="ts">
    import type { Pathname } from '$app/types'
    import { resolve } from '$app/paths'
    import type { BlogLocale } from '$lib/blog/posts'
    import { localizePost } from '$lib/blog/posts'
    import SiteHeader from '$lib/components/home/SiteHeader.svelte'
    import ActionLink from '$lib/components/ui/ActionLink.svelte'
    import { localeStore } from '$lib/locale.svelte'
    import { fly } from 'svelte/transition'
    import type { PageProps } from './$types'

    let { data }: PageProps = $props()

    const socialLinks = {
        github: 'https://github.com/ant-le',
        linkedin: 'https://at.linkedin.com/in/anton-luis-lechuga-b9a4572bb',
    }

    const blogHref = resolve('/blog' as Pathname)
    const pageTransition = { duration: 180, y: 12 }
    const post = $derived(
        localizePost(data.post, localeStore.current as BlogLocale)
    )
    const backLabel = $derived(
        localeStore.current === 'de' ? 'Zurück zum Blog' : 'Back to blog'
    )
</script>

<svelte:head>
    <title>{post.title} | Anton Lechuga</title>
    <meta name="description" content={post.excerpt} />
</svelte:head>

<main class="bg-paper-muted text-ink min-h-screen w-full">
    <div class="bg-paper flex min-h-screen w-full flex-col">
        <SiteHeader {socialLinks} />

        {#key localeStore.current}
            <article
                class="border-ink border-b-4"
                transition:fly={pageTransition}
            >
                <header
                    class="border-ink grid border-b-4 lg:grid-cols-[0.7fr_1.3fr]"
                >
                    <div
                        class="min-h-80 bg-cover bg-center p-6 lg:p-10"
                        style:background-image={`url('${resolve(post.image as Pathname)}')`}
                    >
                        <ActionLink class="bg-paper" href={blogHref}>
                            {backLabel}
                        </ActionLink>
                    </div>
                    <div class="bg-paper p-6 lg:p-10">
                        <p class="font-black tracking-tight uppercase">
                            {post.date} / {post.category}
                        </p>
                        <h1
                            class="font-display mt-4 text-6xl leading-none font-black tracking-tight uppercase lg:text-8xl"
                        >
                            {post.title}
                        </h1>
                        <p
                            class="mt-6 max-w-3xl text-xl leading-snug font-bold"
                        >
                            {post.excerpt}
                        </p>
                    </div>
                </header>

                <div
                    class="mx-auto grid max-w-4xl gap-6 p-6 text-xl leading-relaxed font-bold lg:p-10"
                >
                    {#each post.body as paragraph, index (`${post.slug}-${index}`)}
                        <p>{paragraph}</p>
                    {/each}
                </div>
            </article>
        {/key}
    </div>
</main>
