<script lang="ts">
    import type { Pathname } from '$app/types'
    import { resolve } from '$app/paths'
    import type { BlogCategoryKey, BlogPost } from '$lib/blog/posts'
    import { getPosts } from '$lib/blog/posts'
    import ScrollReveal from '$lib/components/home/ScrollReveal.svelte'
    import SiteHeader from '$lib/components/home/SiteHeader.svelte'
    import ActionLink from '$lib/components/ui/ActionLink.svelte'
    import BrutalCard from '$lib/components/ui/BrutalCard.svelte'
    import { localeStore } from '$lib/locale.svelte'
    import { m } from '$lib/paraglide/messages.js'
    import { fly } from 'svelte/transition'

    let selectedPostSlug = $state<string | null>(null)
    let modalTop = $state(0)
    let searchQuery = $state('')
    let selectedCategory = $state<BlogCategoryKey | 'all'>('all')
    let selectedOrder = $state('newest')
    let modalElement: HTMLDivElement | undefined = $state()
    let lastFocusedElement: HTMLElement | null = null

    const socialLinks = {
        github: 'https://github.com/ant-le',
        linkedin: 'https://at.linkedin.com/in/anton-luis-lechuga-b9a4572bb',
    }

    const pageTransition = { duration: 180, y: 12 }
    const blogControlClass =
        'border-ink bg-white focus:bg-paper-muted focus:shadow-brutal-sm w-full border-4 px-3 py-[0.55rem] font-sans text-base font-black normal-case shadow-[5px_5px_0_var(--color-ink)] transition-[transform,box-shadow,background] duration-[120ms] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:outline-none max-lg:border-2 max-lg:px-2 max-lg:py-1 max-lg:leading-tight max-lg:placeholder:text-sm max-lg:shadow-[2px_2px_0_var(--color-ink)]'
    const localizedPosts = $derived(getPosts())
    const selectedPost = $derived(
        localizedPosts.find((post) => post.slug === selectedPostSlug) ?? null
    )
    const ui = $derived({
        title: m.blog_title(),
        description: m.blog_description(),
        controls: m.blog_controls(),
        search: m.blog_search(),
        searchPlaceholder: m.blog_search_placeholder(),
        filter: m.blog_filter(),
        all: m.blog_all(),
        order: m.blog_order(),
        newest: m.blog_newest(),
        oldest: m.blog_oldest(),
        readMore: m.blog_read_more(),
        noPosts: m.blog_no_posts(),
        fullPage: m.blog_full_page(),
        close: m.blog_close(),
    })

    const categories = $derived(
        Array.from(
            new Map(
                localizedPosts.map((post) => [
                    post.categoryKey,
                    { key: post.categoryKey, label: post.category },
                ])
            ).values()
        )
    )

    const visiblePosts = $derived(
        localizedPosts
            .filter((post) => {
                const query = searchQuery.trim().toLowerCase()
                const matchesQuery = query
                    ? [post.title, post.excerpt, post.category]
                          .join(' ')
                          .toLowerCase()
                          .includes(query)
                    : true

                return (
                    matchesQuery &&
                    (selectedCategory === 'all' ||
                        post.categoryKey === selectedCategory)
                )
            })
            .toSorted((a, b) => {
                if (selectedOrder === 'oldest') {
                    return a.date.localeCompare(b.date)
                }

                return b.date.localeCompare(a.date)
            })
    )

    function openPost(post: BlogPost) {
        lastFocusedElement = document.activeElement as HTMLElement | null
        modalTop = window.scrollY
        selectedPostSlug = post.slug
    }

    function closePost() {
        selectedPostSlug = null
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closePost()
            return
        }

        if (event.key !== 'Tab' || !selectedPostSlug || !modalElement) {
            return
        }

        const focusable = Array.from(
            modalElement.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        )

        const first = focusable[0]
        const last = focusable.at(-1)

        if (!first || !last) {
            event.preventDefault()
            modalElement.focus()
            return
        }

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    }

    $effect(() => {
        if (!selectedPostSlug) return

        const scrollY = modalTop
        const previousPosition = document.body.style.position
        const previousTop = document.body.style.top
        const previousWidth = document.body.style.width
        const previousOverflow = document.body.style.overflow

        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
        document.body.style.overflow = 'hidden'
        requestAnimationFrame(() => modalElement?.focus())

        return () => {
            document.body.style.position = previousPosition
            document.body.style.top = previousTop
            document.body.style.width = previousWidth
            document.body.style.overflow = previousOverflow
            window.scrollTo(0, scrollY)
            lastFocusedElement?.focus()
        }
    })
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
    <title>{ui.title} | Anton Lechuga</title>
    <meta name="description" content={ui.description} />
    <meta property="og:title" content={`${ui.title} | Anton Lechuga`} />
    <meta property="og:description" content={ui.description} />
    <meta property="og:type" content="website" />
</svelte:head>

<main class="bg-paper-muted text-ink min-h-screen w-full">
    <div class="bg-paper flex min-h-screen w-full flex-col">
        <SiteHeader {socialLinks} />

        {#key localeStore.current}
            <section
                class="border-ink grid flex-1 border-b-4 lg:grid-cols-[1.2fr_0.8fr]"
                in:fly={pageTransition}
            >
                <div
                    class="border-ink bg-brand-teal sticky top-[var(--site-header-height)] z-40 order-1 grid h-24 grid-cols-[minmax(0,1fr)_12rem] items-center gap-3 border-b-4 px-3 py-2 text-white sm:grid-cols-[minmax(0,1fr)_minmax(12rem,14rem)] md:h-28 md:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:order-2 lg:h-[calc(100vh-var(--site-header-height))] lg:grid-cols-1 lg:content-start lg:items-start lg:gap-0 lg:border-b-0 lg:border-l-4 lg:p-10"
                >
                    <div class="min-w-0">
                        <h1
                            class="font-display text-3xl leading-none font-black tracking-tight uppercase md:text-4xl lg:text-9xl"
                        >
                            {ui.title}
                        </h1>
                        <p
                            class="mt-1 line-clamp-2 max-w-md text-[0.62rem] leading-tight font-black uppercase md:text-xs lg:mt-6 lg:line-clamp-none lg:text-xl"
                        >
                            {ui.description}
                        </p>
                    </div>

                    <nav
                        class="border-ink bg-paper text-ink shadow-brutal-sm lg:shadow-brutal-md grid grid-cols-2 gap-0.5 border-4 p-1 max-lg:border-[3px] lg:mt-8 lg:grid-cols-1 lg:gap-4 lg:p-4"
                        aria-label={ui.controls}
                    >
                        <label
                            class="col-span-2 grid gap-0.5 text-[0.45rem] font-black uppercase lg:col-span-1 lg:gap-2 lg:text-xs"
                        >
                            <span class="sr-only lg:not-sr-only"
                                >{ui.search}</span
                            >
                            <input
                                class={blogControlClass}
                                type="search"
                                bind:value={searchQuery}
                                placeholder={ui.searchPlaceholder}
                            />
                        </label>

                        <label
                            class="grid gap-0.5 text-[0.45rem] font-black uppercase lg:gap-2 lg:text-xs"
                        >
                            <span class="sr-only lg:not-sr-only"
                                >{ui.filter}</span
                            >
                            <select
                                class={blogControlClass}
                                bind:value={selectedCategory}
                            >
                                <option value="all">{ui.all}</option>
                                {#each categories as category (category.key)}
                                    <option value={category.key}>
                                        {category.label}
                                    </option>
                                {/each}
                            </select>
                        </label>

                        <label
                            class="grid gap-0.5 text-[0.45rem] font-black uppercase lg:gap-2 lg:text-xs"
                        >
                            <span class="sr-only lg:not-sr-only"
                                >{ui.order}</span
                            >
                            <select
                                class={blogControlClass}
                                bind:value={selectedOrder}
                            >
                                <option value="newest">{ui.newest}</option>
                                <option value="oldest">{ui.oldest}</option>
                            </select>
                        </label>
                    </nav>
                </div>

                <div
                    class="order-2 grid gap-4 p-6 lg:order-1 lg:min-h-[calc(100vh-var(--site-header-height))] lg:p-10"
                    data-header-scroll-region
                >
                    {#each visiblePosts as post (post.slug)}
                        <ScrollReveal>
                            <BrutalCard
                                as="article"
                                class="grid grid-cols-[6.25rem_minmax(0,1fr)] gap-3 !p-3 sm:grid-cols-[8rem_minmax(0,1fr)] md:grid-cols-[11rem_minmax(0,1fr)] lg:gap-4 lg:!p-5"
                            >
                                <img
                                    class="border-ink h-32 w-full border-4 object-cover sm:h-36 md:h-44"
                                    src={resolve(post.image as Pathname)}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div>
                                    <p
                                        class="text-xs font-black tracking-tight uppercase"
                                    >
                                        <time datetime={post.date}
                                            >{post.date}</time
                                        >
                                        / {post.category}
                                    </p>
                                    <h2
                                        class="font-display mt-1 text-xl leading-none font-black tracking-tight uppercase sm:text-3xl lg:mt-2 lg:text-5xl"
                                    >
                                        {post.title}
                                    </h2>
                                    <p
                                        class="mt-2 line-clamp-3 max-w-2xl text-sm leading-snug font-bold lg:mt-3 lg:text-base"
                                    >
                                        {post.excerpt}
                                    </p>
                                    <ActionLink
                                        class="bg-brand-orange mt-4"
                                        onclick={() => openPost(post)}
                                    >
                                        {ui.readMore}
                                    </ActionLink>
                                </div>
                            </BrutalCard>
                        </ScrollReveal>
                    {:else}
                        <BrutalCard as="p" class="text-xl font-black uppercase">
                            {ui.noPosts}
                        </BrutalCard>
                    {/each}
                </div>
            </section>
        {/key}
    </div>
</main>

{#if selectedPost}
    <div
        class="absolute left-0 z-[100] grid h-dvh w-full place-items-center p-4"
        style:top={`${modalTop}px`}
        role="none"
    >
        <button
            class="bg-ink/70 absolute inset-0"
            type="button"
            aria-label={ui.close}
            onclick={closePost}
        ></button>
        <div
            class="border-ink bg-paper shadow-brutal-lg relative h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto overscroll-contain border-4 p-6 lg:h-[calc(100vh-4rem)] lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            tabindex="-1"
            bind:this={modalElement}
        >
            <div
                class="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4"
            >
                <div>
                    <p class="text-sm font-black tracking-tight uppercase">
                        <time datetime={selectedPost.date}
                            >{selectedPost.date}</time
                        >
                        / {selectedPost.category}
                    </p>
                    <h2
                        id="blog-modal-title"
                        class="font-display mt-3 text-5xl leading-none font-black tracking-tight uppercase lg:text-7xl"
                    >
                        {selectedPost.title}
                    </h2>
                </div>
                <div class="flex flex-wrap justify-end gap-3">
                    <ActionLink
                        class="bg-brand-orange"
                        href={resolve(`/blog/${selectedPost.slug}` as Pathname)}
                    >
                        {ui.fullPage}
                    </ActionLink>
                    <ActionLink class="bg-brand-red" onclick={closePost}>
                        {ui.close}
                    </ActionLink>
                </div>
            </div>

            <img
                class="border-ink mt-6 h-64 w-full border-4 object-cover"
                src={resolve(selectedPost.image as Pathname)}
                alt=""
                decoding="async"
            />

            <div class="mt-6 grid gap-5 text-lg leading-relaxed font-bold">
                {#each selectedPost.body as paragraph, index (`${selectedPost.slug}-${index}`)}
                    <p>{paragraph}</p>
                {/each}
            </div>
        </div>
    </div>
{/if}
