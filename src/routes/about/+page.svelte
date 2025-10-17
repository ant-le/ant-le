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

    const cvBodyText =
        'text-base lg:text-lg font-light tracking-wide leading-relaxed text-text-secondary'

    let selectedProject = $state<BlogPost | null>(null)
    function handleReadMore(post: BlogPost) {
        selectedProject = selectedProject === post ? null : post
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
    class="rounded-3xl artistic:border bg-bg-surface p-6 md:p-10 artistic:border-accent/30 artistic:bg-primary/5 artistic:shadow-lg"
>
    <div class="space-y-12">
        <header
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
            <h1>Curriculum Vitae</h1>
            <div
                class="flex flex-wrap items-center gap-3 text-sm rounded-md border border-accent/40 px-4 py-2"
            >
                <Dropdown
                    options={languageOptions}
                    bind:selectedValue={selectedLanguage}
                    position="bottom"
                />
                <a
                    class="inline-flex items-center gap-1 font-medium text-text-primary decoration-neutral-300 transition-colors duration-200 hover:decoration-text-primary"
                    href={`${base}${currentCV.download.href}`}
                    download
                >
                    {currentCV.download.label}
                </a>
            </div>
        </header>

        <div class="space-y-12">
            <div
                class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
            >
                <aside class="space-y-8">
                    <h3>Summary</h3>
                    <section class="space-y-4">
                        <p class={cvBodyText}>
                            {currentCV.sections.introduction}
                        </p>
                        <p class={cvBodyText}>
                            {currentCV.tagline}
                        </p>
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
                                        class="flex flex-wrap items-center gap-y-1.5 text-text-tertiary"
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
                            class="flex flex-wrap items-center gap-y-1.5 text-text-tertiary"
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

                <div class="space-y-8">
                    <section
                        class="space-y-4 border-b border-neutral-300/40 pb-6 last:border-b-0 artistic:border-b-0"
                    >
                        <h3>Professional Experience</h3>
                        <div class="space-y-4">
                            {#each currentCV.sections.experience as role (`${role.role}-${role.organisation}-${role.period.from}`)}
                                <details
                                    class="group/entry overflow-hidden rounded-2xl border-b artistic:border border-neutral-200/60 shadow-sm artistic:border-accent/20 artistic:bg-overlay artistic:shadow-lg"
                                >
                                    <summary
                                        class="flex cursor-pointer list-none items-center gap-4 px-5 py-4 text-left"
                                    >
                                        <span
                                            class="flex h-5 w-5 shrink-0 items-center justify-center text-text-tertiary transition-transform duration-200 origin-center group-open/entry:rotate-90 artistic:text-accent"
                                        >
                                            ▶
                                        </span>

                                        <div
                                            class="text-sm font-medium text-text-tertiary"
                                        >
                                            <span>{role.period.to}</span>
                                            <span class="block"
                                                >{role.period.from}</span
                                            >
                                        </div>
                                        <div class="space-y-1 ml-8">
                                            <h4>
                                                {role.role}
                                            </h4>
                                            <p
                                                class="text-sm font-medium text-text-secondary"
                                            >
                                                {role.organisation}
                                                <span
                                                    class="text-xs uppercase tracking-wide text-text-tertiary"
                                                >
                                                    {CV_SEPARATOR}
                                                    {role.location}
                                                </span>
                                            </p>
                                        </div>
                                    </summary>
                                    <div class="space-y-4 px-5 pb-5">
                                        <ul
                                            class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-text-tertiary"
                                        >
                                            {#each role.tools as tool (tool)}
                                                <li
                                                    class="rounded-full border border-neutral-300 px-3 py-1"
                                                >
                                                    {tool}
                                                </li>
                                            {/each}
                                        </ul>
                                        <ul
                                            class="flex flex-col flex-wrap text-text-tertiary gap-2 px-4"
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
                className="border-t border-neutral-300/40 pt-6 artistic:border-accent/20"
                contentClass="mt-4"
            >
                <EducationSection entries={currentCV.sections.education} />
            </CollapsibleSection>

            <CollapsibleSection
                title="Selected Projects"
                className="border-t border-neutral-300/40 pt-6 artistic:border-accent/20"
            >
                <div class="space-y-4">
                    <p class={`max-w-2xl ${cvBodyText}`}>
                        A rotating set of research, engineering, and creative
                        work. Most of these projects expand on topics like
                        causal inference, generative audio, and applied machine
                        learning.
                    </p>
                    <div
                        class="relative overflow-x-auto pb-4 scrollbar-custom"
                        tabindex="-1"
                    >
                        <div class="flex min-w-full gap-4 md:min-w-0">
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
                className="border-t border-neutral-300/40 pt-6 artistic:border-accent/20"
                contentClass="mt-4"
            >
                <div
                    class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
                >
                    {#if currentCV.sections.interests}
                        <div class="space-y-6">
                            {#each currentCV.sections.interests as block (block.title)}
                                <div class="space-y-3">
                                    <h3>
                                        {block.title}
                                    </h3>
                                    <ul
                                        class="space-y-2 text-sm font-light tracking-wide text-text-secondary leading-relaxed"
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
                    <div class="space-y-4">
                        {#each currentCV.sections.involvement as item (`${item.role}-${item.organisation}-${item.period.from}`)}
                            <details
                                class="group/entry overflow-hidden rounded-2xl border border-neutral-200/60 shadow-sm artistic:border-accent/20 artistic:bg-primary/10 artistic:shadow-lg"
                            >
                                <summary
                                    class="flex cursor-pointer list-none items-start gap-4 px-5 py-4 text-left"
                                >
                                    <span
                                        class="flex h-5 w-5 shrink-0 items-center justify-center text-text-tertiary transition-transform duration-200 origin-center group-open/entry:rotate-90 artistic:text-accent"
                                    >
                                        ▶
                                    </span>
                                    <header
                                        class="grid w-full gap-y-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:items-baseline md:gap-x-6"
                                    >
                                        <div
                                            class="text-sm font-medium text-text-tertiary"
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
                                                class="text-sm font-medium text-text-secondary"
                                            >
                                                {item.organisation}
                                                <span
                                                    class="text-xs uppercase tracking-wide text-text-tertiary"
                                                >
                                                    {CV_SEPARATOR}
                                                    {item.location}
                                                </span>
                                            </p>
                                        </div>
                                    </header>
                                </summary>
                                <div class="px-5 pb-5">
                                    <ul
                                        class="space-y-2 text-sm font-light tracking-wide text-text-secondary leading-relaxed"
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
