<script lang="ts">
    import { resolve } from '$app/paths'
    import { m } from '$lib/paraglide/messages.js'
    import { localeStore, setClientLocale } from '$lib/locale.svelte'
    import NavIconLink from './NavIconLink.svelte'
    import { fly } from 'svelte/transition'

    type SocialLinks = {
        github: string
        linkedin: string
    }

    let { socialLinks }: { socialLinks: SocialLinks } = $props()

    const homeHref = resolve('/')
    const nextLocale = $derived(localeStore.current === 'de' ? 'en' : 'de')
    const labelTransition = { duration: 140, y: 6 }

    function switchLanguage(event: MouseEvent) {
        event.preventDefault()
        setClientLocale(nextLocale)
    }
</script>

<header
    class="grid grid-cols-[minmax(0,1fr)_auto] items-stretch border-b-4 border-ink"
>
    <a
        href={homeHref}
        class="block bg-brand-orange px-5 py-4 font-display text-7xl font-black uppercase leading-none tracking-tight"
    >
        {m.site_title()}
    </a>

    <nav
        class="flex items-stretch justify-end border-l-4 border-ink"
        aria-label="Social links"
    >
        <NavIconLink
            class="nav-github"
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
            class="nav-linkedin"
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
            class="nav-text nav-language"
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
