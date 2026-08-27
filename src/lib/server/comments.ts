import type { CommentSubmission } from '$lib/comments'
import ipaddr from 'ipaddr.js'

export const commentLimits = {
    authorName: 50,
    body: 2_000,
    links: 2,
} as const

type ParsedSubmission =
    | { accepted: true; authorName: string; body: string }
    | { accepted: false; spam: boolean }

const controlCharacters = /[\p{Cc}\p{Cf}]/u
const htmlTag = /<\/?[a-z][^>]*>/iu
const url = /(?:https?:\/\/|www\.)/iu
const excessiveRepetition = /(.)\1{15,}/u

export function parseCommentSubmission(value: unknown): ParsedSubmission {
    if (!value || typeof value !== 'object')
        return { accepted: false, spam: false }

    const submission = value as Partial<CommentSubmission>
    if (typeof submission.website === 'string' && submission.website.trim()) {
        return { accepted: false, spam: true }
    }
    if (
        typeof submission.authorName !== 'string' ||
        typeof submission.body !== 'string'
    ) {
        return { accepted: false, spam: false }
    }

    const authorName = submission.authorName
        .normalize('NFKC')
        .trim()
        .replace(/\s+/g, ' ')
    const body = submission.body
        .normalize('NFKC')
        .replace(/\r\n?/g, '\n')
        .trim()

    const linkCount = body.match(new RegExp(url, 'giu'))?.length ?? 0
    const valid =
        authorName.length >= 2 &&
        authorName.length <= commentLimits.authorName &&
        body.length >= 3 &&
        body.length <= commentLimits.body &&
        body.split('\n').length <= 20 &&
        !controlCharacters.test(authorName) &&
        !controlCharacters.test(body.replaceAll('\n', '')) &&
        !htmlTag.test(authorName) &&
        !htmlTag.test(body) &&
        !url.test(authorName) &&
        linkCount <= commentLimits.links &&
        !excessiveRepetition.test(body) &&
        /\p{L}.*\p{L}/su.test(body)

    return valid
        ? { accepted: true, authorName, body }
        : { accepted: false, spam: false }
}

export function normalizeClientAddress(address: string) {
    const parsed = ipaddr.process(address)
    if (parsed.kind() === 'ipv4') return parsed.toString()

    return `${parsed
        .toByteArray()
        .slice(0, 8)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')}/64`
}
