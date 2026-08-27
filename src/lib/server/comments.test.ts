import { describe, expect, it } from 'vitest'
import { normalizeClientAddress, parseCommentSubmission } from './comments'

describe('comment filtering', () => {
    it('normalizes valid comments', () => {
        expect(
            parseCommentSubmission({
                authorName: '  Anton   Le  ',
                body: '  A useful comment.\r\nThanks!  ',
            })
        ).toEqual({
            accepted: true,
            authorName: 'Anton Le',
            body: 'A useful comment.\nThanks!',
        })
    })

    it.each([
        { authorName: 'A', body: 'Too short a name' },
        { authorName: 'Spam', body: '<script>alert(1)</script>' },
        {
            authorName: 'Spam',
            body: 'https://a.test https://b.test https://c.test',
        },
        { authorName: 'Spam', body: 'aaaaaaaaaaaaaaaaaaaa' },
        { authorName: 'https://spam.test', body: 'Click this link' },
    ])('rejects invalid or spam-like content', (submission) => {
        expect(parseCommentSubmission(submission).accepted).toBe(false)
    })

    it('silently flags the honeypot', () => {
        expect(
            parseCommentSubmission({
                authorName: 'Bot',
                body: 'Automated message',
                website: 'https://spam.test',
            })
        ).toEqual({ accepted: false, spam: true })
    })
})

describe('client address normalization', () => {
    it('keeps IPv4 addresses and normalizes mapped addresses', () => {
        expect(normalizeClientAddress('192.0.2.10')).toBe('192.0.2.10')
        expect(normalizeClientAddress('::ffff:192.0.2.10')).toBe('192.0.2.10')
    })

    it('groups IPv6 clients by /64 prefix', () => {
        expect(normalizeClientAddress('2001:db8:1234:5678::1')).toBe(
            '20010db812345678/64'
        )
        expect(normalizeClientAddress('2001:db8:1234:5678:ffff::2')).toBe(
            '20010db812345678/64'
        )
    })
})
