<script lang="ts">
    import type { Pathname } from '$app/types'
    import { resolve } from '$app/paths'
    import { m } from '$lib/paraglide/messages.js'
    import { localeStore, setClientLocale } from '$lib/locale.svelte'
    import NavIconLink from './NavIconLink.svelte'
    import { fly } from 'svelte/transition'
    import { onMount } from 'svelte'

    type SocialLinks = {
        github: string
        linkedin: string
    }

    let { socialLinks }: { socialLinks: SocialLinks } = $props()

    const homeHref = resolve('/')
    const blogHref = resolve('/blog' as Pathname)
    const nextLocale = $derived(localeStore.current === 'de' ? 'en' : 'de')
    const labelTransition = { duration: 140, y: 6 }
    const expandedHeaderHeight = '6.75rem'
    const compactHeaderHeight = '4.5rem'

    let isScrolled = $state(false)

    function syncHeaderHeight() {
        const scrollRegions = document.querySelectorAll<HTMLElement>(
            '[data-header-scroll-region]'
        )

        isScrolled =
            window.scrollY > 24 ||
            Array.from(scrollRegions).some((region) => region.scrollTop > 24)

        document.documentElement.style.setProperty(
            '--site-header-height',
            isScrolled ? compactHeaderHeight : expandedHeaderHeight
        )
    }

    onMount(() => {
        syncHeaderHeight()
        window.addEventListener('scroll', syncHeaderHeight, {
            capture: true,
            passive: true,
        })

        return () => {
            document.documentElement.style.setProperty(
                '--site-header-height',
                expandedHeaderHeight
            )
            window.removeEventListener('scroll', syncHeaderHeight, {
                capture: true,
            })
        }
    })

    function switchLanguage(event: MouseEvent) {
        event.preventDefault()
        setClientLocale(nextLocale)
    }
</script>

<header
    class="border-ink bg-brand-orange sticky top-0 z-50 grid h-[var(--site-header-height)] grid-cols-[minmax(0,1fr)_auto_auto_auto] items-stretch overflow-hidden border-b-4 transition-[height] duration-[160ms]"
>
    <a
        href={homeHref}
        class={[
            'bg-brand-orange font-display flex items-center px-3 leading-none font-black tracking-tight uppercase transition-[padding,font-size] duration-[160ms] sm:px-5',
            isScrolled
                ? 'py-2 text-[clamp(1.25rem,5vw,1.8rem)] sm:text-[clamp(1.7rem,5vw,2.5rem)] md:text-4xl lg:text-5xl'
                : 'py-3 text-[clamp(1.35rem,5.8vw,2.15rem)] sm:py-4 sm:text-[clamp(2rem,6vw,3.25rem)] md:text-6xl lg:text-7xl',
        ]}
    >
        {m.site_title()}
    </a>

    <nav
        class="border-ink bg-brand-orange flex items-stretch border-l-4"
        aria-label="Routes"
    >
        <a
            class="border-ink bg-paper hover:bg-paper grid h-full min-h-[3.25rem] place-items-center border-r-4 px-4 py-[0.65rem] text-[0.95rem] font-black tracking-[-0.04em] no-underline shadow-[inset_0_0_0_0_var(--color-ink)] transition-[transform,color,background] duration-[120ms] hover:shadow-[inset_0_-0.45rem_0_var(--color-ink)] max-lg:min-h-[3rem] max-lg:px-[0.8rem] max-lg:py-[0.55rem] max-lg:text-[0.85rem] max-md:min-h-[2.7rem] max-md:px-2 max-md:py-[0.45rem] max-md:text-[0.72rem]"
            href={blogHref}>BLOG</a
        >
    </nav>

    <div
        class="bg-brand-orange px-3 max-lg:px-2 max-md:px-1"
        aria-hidden="true"
    ></div>

    <nav
        class="border-ink flex items-stretch justify-end border-l-4"
        aria-label="Social links"
    >
        <NavIconLink
            class="hover:bg-brand-red"
            href={socialLinks.github}
            label="GitHub"
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M12 1.5a10.5 10.5 0 0 0-3.3 20.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.9 0 4-2.4 4.9-4.7 5.2.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5A10.5 10.5 0 0 0 12 1.5Z"
                />
            </svg>
        </NavIconLink>
        <NavIconLink
            class="hover:bg-brand-teal hover:text-white"
            href={socialLinks.linkedin}
            label="LinkedIn"
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M4.8 7.5H1.6V22h3.2V7.5ZM5 3a1.9 1.9 0 1 0-3.8 0A1.9 1.9 0 0 0 5 3Zm17.4 10.7c0-4.5-2.4-6.6-5.6-6.6-2.6 0-3.7 1.4-4.4 2.4v-2H9.2V22h3.2v-8.1c0-2.1.4-4.2 3.1-4.2 2.6 0 2.7 2.5 2.7 4.4V22h3.2v-8.3Z"
                />
            </svg>
        </NavIconLink>
        <a
            class="border-ink bg-paper hover:bg-brand-green grid h-full min-h-[3.25rem] min-w-[3.25rem] place-items-center border-r-4 p-[0.65rem] text-[0.95rem] font-black tracking-[-0.04em] no-underline transition-[transform,color,background] duration-[120ms] hover:transform-none max-lg:min-w-[3rem] max-lg:p-[0.55rem] max-lg:text-[0.85rem] max-md:min-w-[2.7rem] max-md:p-[0.45rem] max-md:text-[0.72rem]"
            href={homeHref}
            onclick={switchLanguage}
        >
            {#key localeStore.current}
                <span transition:fly={labelTransition}
                    >{m.language_label()}</span
                >
            {/key}
        </a>
    </nav>
</header>
