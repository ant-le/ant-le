import { describe, expect, it } from 'vitest'
import { getPost, getPosts, postEntries } from './posts'

describe('blog posts', () => {
    it('keeps the prerender entries in sync with the published posts', () => {
        expect(postEntries.map(({ slug }) => slug)).toEqual(
            getPosts().map(({ slug }) => slug)
        )
    })

    it('returns posts by slug and rejects unknown slugs', () => {
        const [{ slug }] = postEntries

        expect(getPost(slug)).toMatchObject({ slug })
        expect(getPost('missing-post')).toBeUndefined()
    })
})
