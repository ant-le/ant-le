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
    sources: { paragraph: number; label: string; href: string }[]
}

export const postEntries = [{ slug: 'why-write-in-the-age-of-ai' }] as const

export function getPosts(): BlogPost[] {
    return [
        {
            slug: postEntries[0].slug,
            date: '2026-10-31',
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
                m.blog_post_why_body_6(),
                m.blog_post_why_body_7(),
                m.blog_post_why_body_8(),
            ],
            sources: [
                {
                    paragraph: 3,
                    label: m.blog_post_why_source_1(),
                    href: 'https://arxiv.org/abs/2302.00560',
                },
                {
                    paragraph: 5,
                    label: m.blog_post_why_source_2(),
                    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532/',
                },
                {
                    paragraph: 7,
                    label: m.blog_post_why_source_3(),
                    href: 'https://doi.org/10.1145/3706598.3713778',
                },
            ],
        },
    ]
}

export function getPost(slug: string) {
    return getPosts().find((post) => post.slug === slug)
}
