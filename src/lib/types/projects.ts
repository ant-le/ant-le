import { blogPosts, type BlogPost } from '$lib/types/blog'

const PROJECT_TITLES = [
    'Music Generation with VQ-VAE',
    'Transformer for Theoretical Chemistry',
    'On what we can know',
    'Science is a constant Revolution!',
] as const

function resolveProject(title: (typeof PROJECT_TITLES)[number]): BlogPost {
    const match = blogPosts.find((post) => post.title === title)
    if (!match) {
        throw new Error(`Project post "${title}" is missing in blogPosts dataset`)
    }
    return match
}

export const projectPosts: BlogPost[] = PROJECT_TITLES.map(resolveProject)
