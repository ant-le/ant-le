import superblast from '$lib/assets/superblast.webp'
import berlin from '$lib/assets/berlin.webp'
import chemisty from '$lib/assets/chemistry.jpg'
import music_gen from '$lib/assets/music_gen.png'
import election from '$lib/assets/election.jpg'

export type BlogCategory = 'science' | 'running' | 'music'

export interface BlogPost {
    creationDate: Date
    title: string
    desc: string
    image: string
    labels: string[]
    post: string // Filepath to the full post
    categories: BlogCategory[]
}

export interface RunningPost extends BlogPost {}

export const blogPosts: BlogPost[] = [
    {
        creationDate: new Date('2024-09-15'),
        desc: 'Kurt Goedels Bomshell!',
        title: 'Incompleteness Theorem',
        image: music_gen,
        labels: ['math', 'logic'],
        post: 'https://github.com/ant-le/TechnoGen/blob/main/README.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2022-09-15'),
        desc: 'William James viewpoint',
        title: 'What is truth?',
        image: music_gen,
        labels: ['philosophy'],
        post: 'https://github.com/ant-le/TechnoGen/blob/main/README.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-09-15'),
        desc: 'Thomas Kuhns different perspective on science!',
        title: 'Science comes in Revolutions',
        image: music_gen,
        labels: ['philosophy'],
        post: 'https://github.com/ant-le/TechnoGen/blob/main/README.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-02-15'),
        desc: `I implemented a music generator with a Vector Quantizes
        Variational Autoencoder`,
        title: 'Music Generation with VQ-VAE',
        image: music_gen,
        labels: ['Deep Learning', 'Music', 'Generative AI'],
        post: 'https://github.com/ant-le/TechnoGen/blob/main/README.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2022-03-26'),
        title: 'Austrian Politics - Corruption Scandal',
        desc: `I investigated the election poll currution charges
against former Austrian chancellor Sebastian Kurz`,
        image: election,
        labels: ['bayesian statistics', 'causal inference', 'social science'],
        post: '/posts/ml-healthcare.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2025-07-25'),
        title: 'Transformer for Theoretical Chemistry',
        desc: `I investigated the usefulness of the Equiformerv2
        models for atomic surface reconstruction`,
        image: chemisty,
        labels: ['transformer', 'generative AI', 'theoretical chemistry'],
        post: '/posts/equiformer.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2025-08-31'),
        desc: `I am currently preparing for the 2025 Berlin marathon`,
        title: 'Training for Berlin Marathon',
        image: berlin,
        labels: ['marathon', 'berlin', 'pb'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
    {
        creationDate: new Date('2024-08-31'),
        desc: `The Asics Superblast 2 have been amazing this summer!`,
        title: 'My Favourite Shoe so far',
        image: superblast,
        labels: ['shoes', 'gear', 'running'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
    {
        creationDate: new Date('2025-08-31'),
        desc: `I am currently preparing for the 2025 Berlin marathon`,
        title: 'Training for Berlin Marathon',
        image: berlin,
        labels: ['marathon', 'berlin', 'pb'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
    {
        creationDate: new Date('2024-08-31'),
        desc: `The Asics Superblast 2 have been amazing this summer!`,
        title: 'My Favourite Shoe so far',
        image: superblast,
        labels: ['shoes', 'gear', 'running'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
    {
        creationDate: new Date('2025-08-31'),
        desc: `I am currently preparing for the 2025 Berlin marathon`,
        title: 'Training for Berlin Marathon',
        image: berlin,
        labels: ['marathon', 'berlin', 'pb'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
    {
        creationDate: new Date('2024-08-31'),
        desc: `The Asics Superblast 2 have been amazing this summer!`,
        title: 'My Favourite Shoe so far',
        image: superblast,
        labels: ['shoes', 'gear', 'running'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
]
