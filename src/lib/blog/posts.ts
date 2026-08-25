import { m } from '$lib/paraglide/messages.js'

export type BlogCategoryKey = 'notes'

export type BlogPost = {
    slug: string
    date: string
    categoryKey: BlogCategoryKey
    category: string
    image: string
    title: string
    excerpt: string
    body: string[]
}

export const postEntries = [{ slug: 'why-write-in-the-age-of-ai' }] as const

export function getPosts(): BlogPost[] {
    return [
        {
            slug: postEntries[0].slug,
            date: '2026-07-11',
            categoryKey: 'notes',
            category: m.blog_category_notes(),
            image: '/images/profile.webp',
            title: m.blog_post_why_title(),
            excerpt: m.blog_post_why_excerpt(),
            body: [
                m.blog_post_why_body_1(),
                m.blog_post_why_body_2(),
                m.blog_post_why_body_3(),
                m.blog_post_why_body_4(),
                m.blog_post_why_body_5(),
            ],
        },
    ]
}

export function getPost(slug: string) {
    return getPosts().find((post) => post.slug === slug)
}
