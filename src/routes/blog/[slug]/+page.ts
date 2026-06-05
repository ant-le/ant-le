import { error } from '@sveltejs/kit'
import { getPost, posts } from '$lib/blog/posts'
import type { PageLoad } from './$types'

export const entries = () => posts.map(({ slug }) => ({ slug }))

export const load: PageLoad = ({ params }) => {
    const post = getPost(params.slug)

    if (!post) {
        error(404, 'Post not found')
    }

    return { post }
}
