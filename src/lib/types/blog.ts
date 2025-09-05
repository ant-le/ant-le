import superblast from '$lib/assets/superblast.webp'
import berlin from '$lib/assets/berlin.jpg'
import chemisty from '$lib/assets/chemistry.jpg'
import music_gen from '$lib/assets/music_gen.png'
import election from '$lib/assets/election.jpg'
import whyRun from '$lib/assets/whyRun.jpeg'

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
        creationDate: new Date('2023-08-31'),
        desc: `And why for so long? - It's me-time!`,
        title: 'Why do I run?',
        image: whyRun,
        labels: ['running'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
    {
        creationDate: new Date('2024-09-15'),
        desc: `At a time where matematicians assumed that complete knowledge
        would be soon coming, Kurt Goedel dropped a bombshell on the limitations
        of our current systems of mathematics and logic. The fact that he proved
        (with our logic system) the existance of unprovable true statements 
        should remind us about the limitations we have.`,
        title: 'On what we can know',
        image: music_gen,
        labels: ['mathematics', 'logic'],
        post: 'https://github.com/ant-le/TechnoGen/blob/main/README.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-09-15'),
        desc: `In philosophy of sciences, Thomas Kuhns view on the development
        of science was a fascinating topic for me. He argues that scientific
        progress often means breaking with current word models and views, and
        he describes science as a constant evolution.`,
        title: 'Science is a constant Revolution!',
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
        against former Austrian chancellor Sebastian Kurz with Bayesian
        modelling. I have found that even after considering huge uncertainties 
        present in election polling, the data tends to support the 
        hypothesis that Kurz (and affiliates) were effectively election polls 
        significantly.`,
        image: election,
        labels: ['bayesian statistics', 'causal inference', 'social science'],
        post: '/posts/ml-healthcare.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2025-07-25'),
        title: 'Transformer for Theoretical Chemistry',
        desc: `I investigated the usefulness of the Equiformerv2
        models for atomic surface reconstruction. I found that while 
        providing accurate predicitions for in-distribution data, the models
        fail to generalise to out-of-distribution data.`,
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
]
