<script lang="ts">
    import { base } from '$app/paths'
    import Dropdown from '$lib/components/Dropdown.svelte'
    import ProjectCard from '$lib/components/cards/ProjectCard.svelte'
    import FullBlog from '$lib/components/FullBlog.svelte'
    import EducationSection from '$lib/components/EducationSection.svelte'
    import CollapsibleSection from '$lib/components/CollapsibleSection.svelte'
    import CvIcon from '$lib/components/CvIcon.svelte'

    import type { BlogPost } from '$lib/types/blog'
    import type { NavItem } from '$lib/types/types'
    import {
        CV_SEPARATOR,
        cvContentByLanguage,
        cvLanguageOptions,
        DEFAULT_CV_LANGUAGE,
        type CVLanguage,
    } from '$lib/types/about'
    import { projectPosts } from '$lib/types/projects'

    const languageOptions: NavItem[] = cvLanguageOptions
    const defaultLanguage =
        languageOptions.find(
            (option) => option.value === DEFAULT_CV_LANGUAGE
        ) ?? languageOptions[0]

    let selectedLanguage = $state<NavItem>(defaultLanguage)
    let currentCV = $derived(
        cvContentByLanguage[selectedLanguage.value as CVLanguage]
    )

    let selectedProject = $state<BlogPost | null>(null)
    function handleReadMore(post: BlogPost) {
        selectedProject = selectedProject === post ? null : post
    }

    let openExperienceId = $state<string | null>(null)
    function handleExperienceToggle(id: string, event: Event) {
        const element = event.currentTarget as HTMLDetailsElement | null
        if (!element) {
            return
        }
        if (element.open) {
            openExperienceId = id
        } else if (openExperienceId === id) {
            openExperienceId = null
        }
    }
</script>

<svelte:head>
    <title>Anton Lechuga | About</title>
    <meta
        name="description"
        content="Curriculum vitae, projects, and background information about Anton Lechuga."
    />
</svelte:head>

<section
    class="my-8 rounded-3xl border border-accent-yellow bg-bg-secondary/80 p-8 md:p-14 shadow-lg backdrop-blur-sm transition-colors duration-300
    artistic:my-12 artistic:border-4 artistic:border-text-primary artistic:bg-bg-secondary artistic:shadow-[12px_12px_0px_rgba(0,0,0,1)]"
>
    <div class="space-y-16">
        <header
            class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
            <h1>Curriculum Vitae</h1>
            <div
                class="flex flex-wrap items-center gap-3 rounded-full border border-bg-tertiary/60 bg-bg-secondary/70 px-4 py-2 text-sm shadow-sm transition-colors duration-300
                artistic:border-4 artistic:border-text-primary artistic:bg-bg-primary artistic:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            >
                <Dropdown
                    options={languageOptions}
                    bind:selectedValue={selectedLanguage}
                    position="bottom"
                />
                <a
                    class="inline-flex items-center gap-1 font-semibold text-text-primary decoration-bg-tertiary/60 transition-colors duration-200 hover:decoration-text-primary"
                    href={`${base}${currentCV.download.href}`}
                    download
                >
                    {currentCV.download.label}
                </a>
            </div>
        </header>

        <div class="space-y-16">
            <div
                class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
            >
                <aside class="space-y-10">
                    <h3>Summary</h3>
                    <section class="space-y-4">
                        <p>{currentCV.sections.introduction}</p>
                        <p>{currentCV.tagline}</p>
                    </section>
                    <section class="space-y-4">
                        <h3>Skills</h3>
                        <div class="space-y-3">
                            {#each currentCV.sections.skillGroups as group (group.title)}
                                <div class="space-y-2">
                                    <h4>
                                        {group.title}
                                    </h4>
                                    <ul
                                        class="flex flex-wrap items-center gap-y-1.5 text-text-secondary/70"
                                    >
                                        {#each group.items as item, index (item)}
                                            <li
                                                class="flex items-center gap-2 pr-3"
                                            >
                                                {#if index !== 0}
                                                    <CvIcon type="separator" />
                                                {/if}
                                                <span>{item}</span>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/each}
                        </div>
                    </section>

                    <section class="space-y-3">
                        <h3>Languages</h3>
                        <ul
                            class="flex flex-wrap items-center gap-y-1.5 text-text-secondary/70"
                        >
                            {#each currentCV.sections.languages as language, index (language.name)}
                                <li class="flex items-center gap-2 pr-3">
                                    {#if index !== 0}
                                        <CvIcon type="separator" />
                                    {/if}
                                    <span
                                        >{language.name} ({language.level})</span
                                    >
                                </li>
                            {/each}
                        </ul>
                    </section>
                </aside>

                <div class="space-y-10">
                    <section
                        class="space-y-6 border-b border-bg-tertiary/60 pb-8 last:border-b-0 artistic:border-b-0"
                    >
                        <h3>Professional Experience</h3>
                        <div class="space-y-6">
                            {#each currentCV.sections.experience as role (`${role.role}-${role.organisation}-${role.period.from}`)}
                                {@const entryId = `${role.role}-${role.organisation}-${role.period.from}`}
                                <details
                                    class="group/entry overflow-hidden rounded-2xl border border-bg-tertiary/60 bg-bg-secondary/70 shadow-sm transition-colors duration-200 open:border-accent-orange/60 open:shadow-lg
                                    artistic:border-4 artistic:border-text-primary artistic:bg-accent-yellow artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                                    open={openExperienceId === entryId}
                                    ontoggle={(event) =>
                                        handleExperienceToggle(entryId, event)}
                                >
                                    <summary
                                        class="flex cursor-pointer list-none items-start gap-4 px-6 py-5 text-left md:items-center"
                                    >
                                        <span
                                            class="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary/60 transition-transform duration-200 origin-center group-open/entry:rotate-90 artistic:text-accent-pink"
                                        >
                                            ▶
                                        </span>

                                        <div
                                            class="text-sm font-semibold text-text-secondary/70 md:text-right artistic:text-text-primary/80"
                                        >
                                            <span>{role.period.to}</span>
                                            <span class="block"
                                                >{role.period.from}</span
                                            >
                                        </div>
                                        <div class="ml-6 space-y-1">
                                            <h4>
                                                {role.role}
                                            </h4>
                                            <p
                                                class="text-sm font-semibold text-text-secondary artistic:text-text-primary/90"
                                            >
                                                {role.organisation}
                                                <span
                                                    class="text-xs uppercase tracking-wide text-text-secondary/60 artistic:text-text-primary/70"
                                                >
                                                    {CV_SEPARATOR}
                                                    {role.location}
                                                </span>
                                            </p>
                                        </div>
                                    </summary>
                                    <div class="space-y-4 px-6 pb-6">
                                        <ul
                                            class="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-text-secondary/70 artistic:text-text-primary/80"
                                        >
                                            {#each role.tools as tool (tool)}
                                                <li
                                                    class="rounded-full border border-bg-tertiary/60 bg-bg-secondary/70 px-3 py-1 leading-none artistic:border-4 artistic:border-text-primary artistic:bg-bg-primary"
                                                >
                                                    {tool}
                                                </li>
                                            {/each}
                                        </ul>
                                        <ul
                                            class="flex flex-col flex-wrap gap-2 px-4 text-text-secondary/75 artistic:text-text-primary/90"
                                        >
                                            {#each role.achievements as achievement (achievement)}
                                                <li
                                                    class="flex items-center gap-4"
                                                >
                                                    <CvIcon type="separator" />
                                                    <span>{achievement}</span>
                                                </li>
                                            {/each}
                                        </ul>
                                    </div>
                                </details>
                            {/each}
                        </div>
                    </section>
                </div>
            </div>
            <CollapsibleSection
                title="Education"
                summary="B.A. Social Science - M.Sc. Data Science"
                className="border-t border-bg-tertiary/60 pt-8 artistic:border-t-4 artistic:border-text-primary"
                contentClass="mt-6"
            >
                <EducationSection entries={currentCV.sections.education} />
            </CollapsibleSection>

            <CollapsibleSection
                title="Selected Projects"
                className="border-t border-bg-tertiary/60 pt-8 artistic:border-t-4 artistic:border-text-primary"
            >
                <div class="space-y-6">
                    <p>
                        A rotating set of research, engineering, and creative
                        work. Most of these projects expand on topics like
                        causal inference, generative audio, and applied machine
                        learning.
                    </p>
                    <div
                        class="relative overflow-x-auto pb-4 scrollbar-custom"
                        tabindex="-1"
                    >
                        <div class="flex min-w-full gap-6 md:min-w-0">
                            {#each projectPosts as project (`${project.title}-${project.post}`)}
                                <div class="w-72 flex-shrink-0 md:w-80">
                                    <ProjectCard
                                        post={project}
                                        onReadMore={handleReadMore}
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                title="Additional Involvement"
                className="border-t border-bg-tertiary/60 pt-8 artistic:border-t-4 artistic:border-text-primary"
                contentClass="mt-6"
            >
                <div
                    class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
                >
                    {#if currentCV.sections.interests}
                        <div class="space-y-6">
                            {#each currentCV.sections.interests as block (block.title)}
                                <div class="space-y-3">
                                    <h3>
                                        {block.title}
                                    </h3>
                                    <ul
                                        class="space-y-2 text-sm font-normal tracking-wide text-text-secondary leading-relaxed"
                                    >
                                        {#each block.items as item (item)}
                                            <li class="flex items-start gap-3">
                                                <CvIcon
                                                    type="bullet"
                                                    className="mt-1"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/each}
                        </div>
                    {/if}
                    <div
                        class="space-y-6 border border-bg-tertiary/60 p-6 artistic:border-4 artistic:border-text-primary artistic:bg-bg-primary md:p-8"
                    >
                        {#each currentCV.sections.involvement as item (`${item.role}-${item.organisation}-${item.period.from}`)}
                            <details
                                class="group/entry overflow-hidden rounded-2xl border border-bg-tertiary/60 bg-bg-secondary/70 shadow-sm transition-colors duration-200 open:border-accent-violet/60 open:shadow-lg
                                artistic:border-4 artistic:border-text-primary artistic:bg-bg-secondary artistic:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                            >
                                <summary
                                    class="flex cursor-pointer list-none items-start gap-4 px-6 py-5 text-left"
                                >
                                    <span
                                        class="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary/60 transition-transform duration-200 origin-center group-open/entry:rotate-90 artistic:text-accent-pink"
                                    >
                                        ▶
                                    </span>
                                    <header
                                        class="grid w-full gap-y-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:items-baseline md:gap-x-6"
                                    >
                                        <div
                                            class="text-sm font-semibold text-text-secondary/70"
                                        >
                                            <span>{item.period.from}</span>
                                            <span class="block"
                                                >{item.period.to}</span
                                            >
                                        </div>
                                        <div class="space-y-1">
                                            <h3>
                                                {item.role}
                                            </h3>
                                            <p
                                                class="text-sm font-semibold text-text-secondary"
                                            >
                                                {item.organisation}
                                                <span
                                                    class="text-xs uppercase tracking-wide text-text-secondary/60"
                                                >
                                                    {CV_SEPARATOR}
                                                    {item.location}
                                                </span>
                                            </p>
                                        </div>
                                    </header>
                                </summary>
                                <div class="px-6 pb-6">
                                    <ul
                                        class="space-y-2 text-sm font-normal tracking-wide text-text-secondary leading-relaxed"
                                    >
                                        {#each item.details as detail (detail)}
                                            <li class="flex items-start gap-3">
                                                <CvIcon
                                                    type="bullet"
                                                    className="mt-1"
                                                />
                                                <span>{detail}</span>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            </details>
                        {/each}
                    </div>
                </div>
            </CollapsibleSection>
        </div>
    </div>
</section>

{#if selectedProject}
    <FullBlog post={selectedProject} />
{/if}
