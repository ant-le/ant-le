import { createHash, createHmac, randomUUID } from 'node:crypto'
import { env } from '$env/dynamic/private'
import { postEntries } from '$lib/blog/posts'
import type { BlogComment } from '$lib/comments'
import {
    normalizeClientAddress,
    parseCommentSubmission,
} from '$lib/server/comments'
import { database } from '$lib/server/db'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const prerender = false

const RATE_LIMIT = 3
const ALLOWED_ORIGINS = new Set([
    'https://antonlechuga.com',
    'https://www.antonlechuga.com',
])

class RateLimitError extends Error {}
class DuplicateCommentError extends Error {}

function isKnownPost(slug: string) {
    return postEntries.some((post) => post.slug === slug)
}

export const GET: RequestHandler = async ({ params }) => {
    if (!isKnownPost(params.slug))
        return json({ message: 'Post not found.' }, { status: 404 })

    try {
        const sql = database()
        const comments = await sql<BlogComment[]>`
            SELECT * FROM (
                SELECT
                    id,
                    author_name AS "authorName",
                    body,
                    created_at AS "createdAt"
                FROM comments
                WHERE post_slug = ${params.slug} AND status = 'published'
                ORDER BY created_at DESC
                LIMIT 100
            ) recent
            ORDER BY "createdAt" ASC
        `

        return json({ comments }, { headers: { 'Cache-Control': 'no-store' } })
    } catch (error) {
        console.error('Unable to load comments', error)
        return json(
            { message: 'Comments are temporarily unavailable.' },
            { status: 503 }
        )
    }
}

export const POST: RequestHandler = async ({
    getClientAddress,
    params,
    request,
}) => {
    if (!isKnownPost(params.slug))
        return json({ message: 'Post not found.' }, { status: 404 })
    if (!ALLOWED_ORIGINS.has(request.headers.get('origin') || '')) {
        return json({ message: 'Invalid origin.' }, { status: 403 })
    }
    if (!request.headers.get('content-type')?.startsWith('application/json')) {
        return json({ message: 'Invalid request.' }, { status: 415 })
    }

    const submission = parseCommentSubmission(
        await request.json().catch(() => undefined)
    )
    if (!submission.accepted) {
        return submission.spam
            ? new Response(null, { status: 204 })
            : json(
                  { message: 'Check the name and comment content.' },
                  { status: 400 }
              )
    }
    if (!env.COMMENTS_HASH_SECRET) {
        console.error('COMMENTS_HASH_SECRET is not configured')
        return json(
            { message: 'Comments are temporarily unavailable.' },
            { status: 503 }
        )
    }

    const submitterHash = createHmac('sha256', env.COMMENTS_HASH_SECRET)
        .update(normalizeClientAddress(getClientAddress()))
        .digest('hex')
    const bodyHash = createHash('sha256').update(submission.body).digest('hex')

    try {
        const sql = database()
        const comment = await sql.begin(async (transaction) => {
            await transaction`SELECT pg_advisory_xact_lock(hashtextextended(${submitterHash}, 0))`
            await transaction`
                DELETE FROM comment_submission_events
                WHERE created_at < now() - interval '24 hours'
            `

            const [rate] = await transaction<{ count: number }[]>`
                SELECT count(*)::int AS count
                FROM comment_submission_events
                WHERE submitter_hash = ${submitterHash}
                    AND created_at > now() - interval '1 hour'
            `
            if (rate.count >= RATE_LIMIT) throw new RateLimitError()

            const [duplicate] = await transaction<{ exists: boolean }[]>`
                SELECT EXISTS (
                    SELECT 1
                    FROM comment_submission_events
                    WHERE submitter_hash = ${submitterHash}
                        AND body_hash = ${bodyHash}
                        AND created_at > now() - interval '24 hours'
                ) AS exists
            `
            if (duplicate.exists) throw new DuplicateCommentError()

            await transaction`
                INSERT INTO comment_submission_events (submitter_hash, body_hash)
                VALUES (${submitterHash}, ${bodyHash})
            `

            const [created] = await transaction<BlogComment[]>`
                INSERT INTO comments (
                    id,
                    post_slug,
                    author_name,
                    body,
                    status
                ) VALUES (
                    ${randomUUID()},
                    ${params.slug},
                    ${submission.authorName},
                    ${submission.body},
                    'published'
                )
                RETURNING
                    id,
                    author_name AS "authorName",
                    body,
                    created_at AS "createdAt"
            `

            return created
        })

        return json({ comment }, { status: 201 })
    } catch (error) {
        if (error instanceof RateLimitError) {
            return json(
                { message: 'Too many comments. Please try again later.' },
                { status: 429 }
            )
        }
        if (error instanceof DuplicateCommentError) {
            return json(
                { message: 'This comment was already submitted.' },
                { status: 409 }
            )
        }

        console.error('Unable to save comment', error)
        return json(
            { message: 'Comments are temporarily unavailable.' },
            { status: 503 }
        )
    }
}
