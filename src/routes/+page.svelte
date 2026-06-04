<script lang="ts">
    import type { Pathname } from '$app/types'
    import { resolve } from '$app/paths'
    import HeroProfile from '$lib/components/home/HeroProfile.svelte'
    import MusicSection from '$lib/components/home/MusicSection.svelte'
    import QuoteBlock from '$lib/components/home/QuoteBlock.svelte'
    import ReferencesSection from '$lib/components/home/ReferencesSection.svelte'
    import type { Friend } from '$lib/components/home/ReferenceCard.svelte'
    import RunningSection from '$lib/components/home/RunningSection.svelte'
    import ScrollReveal from '$lib/components/home/ScrollReveal.svelte'
    import SiteHeader from '$lib/components/home/SiteHeader.svelte'
    import WorkStudySection from '$lib/components/home/WorkStudySection.svelte'
    import { m } from '$lib/paraglide/messages.js'

    const socialLinks = {
        github: 'https://github.com/ant-le',
        linkedin: 'https://at.linkedin.com/in/anton-luis-lechuga-b9a4572bb',
    }

    const sectionLinks = {
        strava: 'https://www.strava.com/athletes/118526108',
        soundcloud: 'https://soundcloud.com/antonlechuga',
    }

    const profileImage = resolve('/images/profile.webp' as Pathname)

    const runningPBs: readonly [string, string][] = [
        ['5k', '18:12'],
        ['10k', '39:58'],
        ['Half', '1:26:57'],
        ['Marathon', '3:05:57'],
    ]

    const albums: readonly [string, string][] = [
        ['Hand. Cannot. Erase.', 'Steven Wilson'],
        ['Rush', 'Rush'],
        ['PetroDragonic Apocalypse', 'King Gizzard & the Lizard Wizard'],
    ]

    const friends: Friend[] = $derived([
        {
            name: 'Kristian Ristic',
            role: m.friend_kristian_role(),
            text: m.friend_kristian_text(),
            image: resolve('/images/kristian.jpg' as Pathname),
        },
        {
            name: 'Tilman Kerl',
            role: m.friend_tilman_role(),
            text: m.friend_tilman_text(),
            image: resolve('/images/tilman.jpg' as Pathname),
        },
        {
            name: 'Luca Salsetti',
            role: m.friend_luca_role(),
            text: m.friend_luca_text(),
            image: resolve('/images/lama.jpg' as Pathname),
        },
        {
            name: 'Anton Lechuga',
            role: m.friend_anton_role(),
            text: m.friend_anton_text(),
            image: resolve('/images/anton.webp' as Pathname),
        },
    ])
</script>

<svelte:head>
    <title>{m.site_title()}</title>
    <meta name="description" content={m.meta_description()} />
</svelte:head>

<main class="min-h-screen w-full bg-paper-muted text-ink">
    <div class="flex min-h-screen w-full flex-col bg-paper">
        <SiteHeader {socialLinks} />

        <section
            class="grid flex-1 border-b-4 border-ink lg:grid-cols-[0.9fr_1.3fr]"
        >
            <ScrollReveal>
                <HeroProfile image={profileImage} />
            </ScrollReveal>
            <ScrollReveal delay={90}>
                <WorkStudySection />
            </ScrollReveal>
        </section>

        <ScrollReveal>
            <QuoteBlock />
        </ScrollReveal>

        <section class="grid border-b-4 border-ink lg:grid-cols-2" id="running">
            <ScrollReveal>
                <RunningSection
                    personalBests={runningPBs}
                    stravaHref={sectionLinks.strava}
                />
            </ScrollReveal>
            <ScrollReveal delay={90}>
                <MusicSection
                    {albums}
                    soundcloudHref={sectionLinks.soundcloud}
                />
            </ScrollReveal>
        </section>

        <ScrollReveal>
            <ReferencesSection {friends} />
        </ScrollReveal>
    </div>
</main>
