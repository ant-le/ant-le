import { error } from '@sveltejs/kit'
import { postEntries } from '$lib/blog/posts'
import type { PageLoad } from './$types'

export const entries = () => [...postEntries]

export const load: PageLoad = ({ params }) => {
    if (!postEntries.some(({ slug }) => slug === params.slug)) {
        error(404, 'Post not found')
    }

    return { slug: params.slug }
}
