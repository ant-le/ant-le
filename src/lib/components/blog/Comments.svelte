<script lang="ts">
    import { base } from '$app/paths'
    import type { BlogComment } from '$lib/comments'
    import { localeStore } from '$lib/locale.svelte'
    import { m } from '$lib/paraglide/messages.js'
    import { onMount } from 'svelte'

    let { slug }: { slug: string } = $props()

    let comments = $state<BlogComment[]>([])
    let authorName = $state('')
    let body = $state('')
    let website = $state('')
    let loading = $state(true)
    let submitting = $state(false)
    let message = $state('')

    const dateFormatter = $derived(
        new Intl.DateTimeFormat(localeStore.current, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    )

    onMount(loadComments)

    async function loadComments() {
        loading = true
        message = ''

        try {
            const response = await fetch(
                `${base}/api/comments/${encodeURIComponent(slug)}`
            )
            if (!response.ok) throw new Error('Unable to load comments')
            const result = (await response.json()) as {
                comments: BlogComment[]
            }
            comments = result.comments
        } catch {
            message = m.blog_comments_unavailable()
        } finally {
            loading = false
        }
    }

    async function submitComment(event: SubmitEvent) {
        event.preventDefault()
        submitting = true
        message = ''

        try {
            const response = await fetch(
                `${base}/api/comments/${encodeURIComponent(slug)}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ authorName, body, website }),
                }
            )

            if (response.status === 204) {
                authorName = ''
                body = ''
                return
            }

            const result = (await response.json()) as {
                comment?: BlogComment
                message?: string
            }
            if (!response.ok || !result.comment) {
                throw new Error(result.message || 'Unable to submit comment')
            }

            comments = [...comments, result.comment]
            body = ''
            message = m.blog_comments_submitted()
        } catch {
            message = m.blog_comments_submit_error()
        } finally {
            submitting = false
        }
    }
</script>

<section
    class="bg-paper-muted border-ink border-t-4 p-6 lg:p-10"
    aria-labelledby="comments-title"
>
    <div class="mx-auto max-w-4xl">
        <h2
            id="comments-title"
            class="font-display text-5xl leading-none font-black tracking-tight uppercase lg:text-7xl"
        >
            {m.blog_comments_title()}
        </h2>
        <p class="mt-3 max-w-2xl text-lg font-bold">
            {m.blog_comments_description()}
        </p>

        <form class="mt-8 grid gap-4" onsubmit={submitComment}>
            <label class="grid gap-2 font-black uppercase" for="comment-name">
                {m.blog_comments_name()}
                <input
                    id="comment-name"
                    class="border-ink bg-paper border-4 px-4 py-3 font-bold normal-case"
                    bind:value={authorName}
                    minlength="2"
                    maxlength="50"
                    autocomplete="name"
                    required
                />
            </label>

            <label class="grid gap-2 font-black uppercase" for="comment-body">
                {m.blog_comments_comment()}
                <textarea
                    id="comment-body"
                    class="border-ink bg-paper min-h-36 resize-y border-4 px-4 py-3 font-bold normal-case"
                    bind:value={body}
                    minlength="3"
                    maxlength="2000"
                    required
                ></textarea>
            </label>

            <label class="sr-only" for="comment-website">
                Website
                <input
                    id="comment-website"
                    bind:value={website}
                    tabindex="-1"
                    autocomplete="off"
                />
            </label>

            <div class="flex flex-wrap items-center justify-between gap-3">
                <span class="text-sm font-bold">{body.length}/2000</span>
                <button
                    class="border-ink bg-accent shadow-brutal hover:bg-accent-soft border-4 px-6 py-3 font-black uppercase disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting
                        ? m.blog_comments_submitting()
                        : m.blog_comments_submit()}
                </button>
            </div>
        </form>

        <p class="mt-4 min-h-6 font-bold" aria-live="polite">{message}</p>

        <div class="mt-8 grid gap-4" aria-busy={loading}>
            {#if loading}
                <p class="font-black uppercase">{m.blog_comments_loading()}</p>
            {:else if comments.length === 0}
                <p class="font-black uppercase">{m.blog_comments_empty()}</p>
            {:else}
                {#each comments as comment (comment.id)}
                    <article
                        class="border-ink bg-paper shadow-brutal border-4 p-5"
                    >
                        <header
                            class="flex flex-wrap items-baseline justify-between gap-2"
                        >
                            <h3 class="text-lg font-black">
                                {comment.authorName}
                            </h3>
                            <time
                                class="text-sm font-bold"
                                datetime={comment.createdAt}
                            >
                                {dateFormatter.format(
                                    new Date(comment.createdAt)
                                )}
                            </time>
                        </header>
                        <p class="mt-3 font-bold whitespace-pre-wrap">
                            {comment.body}
                        </p>
                    </article>
                {/each}
            {/if}
        </div>
    </div>
</section>
