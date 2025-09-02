import lama from '$lib/assets/lama.jpg'

import type {
    BlogPost,
    RunningPB,
    FriendsData,
    MusicData,
    RunningTraining,
} from './types'

export const blogPosts: BlogPost[] = [
    {
        creationDate: new Date('2024-02-15'),
        title: 'Music Generation with VQ-VAE',
        image: '/images/placeholder.svg',
        labels: ['Deep Learning', 'Music', 'Generative AI'],
        post: '/posts/vqvae.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2022-03-26'),
        title: 'Austrian Politics - Corruption Scandal',
        image: '/images/placeholder.svg',
        labels: [
            'bayesian statistics',
            'causal inference',
            'political science',
        ],
        post: '/posts/ml-healthcare.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-03-10'),
        title: 'Neural Networks Explained',
        image: '/images/placeholder.svg',
        labels: ['neural-networks', 'deep-learning', 'tutorial'],
        post: '/posts/neural-networks.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2025-07-25'),
        title: 'Transformer for Theoretical Chemistry',
        image: '/images/placeholder.svg',
        labels: ['transformer', 'generative AI', 'theoretical chemistry'],
        post: '/posts/equiformer.md',
        categories: ['science'],
    },
    {
        creationDate: new Date('2025-08-31'),
        title: 'Training for Berlin Marathon',
        image: '/images/berlin2025.svg',
        labels: ['shoes', 'gear', 'running'],
        post: '/posts/berlin2025.md',
        categories: ['running'],
    },
]

export const runningPBs: RunningPB[] = [
    {
        eventDate: new Date('2024-06-06'),
        eventLocation: 'UniRun Vienna, Austria',
        distance: '5k',
        usedShoe: 'Puma Deviate Nitro 2',
        time: '18:12',
    },
    {
        eventDate: new Date('2025-06-22'),
        eventLocation: 'Workout Vienna, Austria',
        distance: '10k',
        usedShoe: 'Puma Deviate Nitro 2',
        time: '39:58',
    },
    {
        eventDate: new Date('2025-08-21'),
        eventLocation: 'Workout Vienna, Austria',
        distance: 'Half Marathon',
        usedShoe: 'Asics Superblast 2',
        time: '1:26:57',
    },
    {
        eventDate: new Date('2024-04-15'),
        eventLocation: 'Bremen Marathon, Germany',
        distance: 'Marathon',
        usedShoe: 'Puma Deviate Nitro 2',
        time: '3:05:57',
    },
]

export const musicPosts: MusicData[] = [
    {
        creationDate: new Date('2025-06-06'),

        title: 'My Favourite Band',
        desc: 'King Gizzard and the Lizzard Wizzard',
        image: lama,
        labels: ['KGLW', 'Rock'],
        post: '', // Filepath to the full post
        iframe: `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/de/album/motor-spirit/1684380069?i=1684380385&l=en-GB"></iframe>`,
    },
    {
        creationDate: new Date('2024-06-06'),

        title: 'My Favourite Electronic Song',
        desc: 'Serenity',
        image: lama,
        labels: ['Techno'],
        post: '', // Filepath to the full post
        iframe: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1358620018&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
    },
]

export const friendsData: FriendsData[] = [
    {
        name: 'Kristian Ristic',
        image: lama,
        text: 'Anton is the single best thing ever happened to my life!',
        role: 'Professional Couch Potato',
    },
    {
        name: 'Tilman Kerl',
        image: lama,
        text: 'Without Anton, I would not have been able to finish uni!',
        role: 'Coffee-Fueled Research Wizard',
    },
    {
        name: 'Luca Salsetti',
        image: lama,
        text: 'He is a genius!',
        role: 'Just a random dude',
    },
    {
        name: 'Emil Daub',
        image: lama,
        text: 'Every single word out of Antons mouth is insightful!',
        role: 'Professional Italian',
    },
]

//TODO:: Get when building from API (strava or garmin)
//For future this can run server-sided
export const runningTraining: RunningTraining[] = [
    { date: new Date('2024-01-01'), distance: 8.5 },
    { date: new Date('2024-01-03'), distance: 12.0 },
    { date: new Date('2024-01-04'), distance: 6.2 },
    { date: new Date('2024-01-06'), distance: 15.0 },
    { date: new Date('2024-01-07'), distance: 5.0 },
    { date: new Date('2024-01-08'), distance: 10.0 },
    { date: new Date('2024-01-10'), distance: 8.5 },
    { date: new Date('2024-01-11'), distance: 13.1 },
    { date: new Date('2024-01-12'), distance: 6.0 },
    { date: new Date('2024-01-14'), distance: 16.0 },
    { date: new Date('2024-01-15'), distance: 7.5 },
    { date: new Date('2024-01-16'), distance: 9.0 },
    { date: new Date('2024-01-18'), distance: 11.0 },
    { date: new Date('2024-01-19'), distance: 5.5 },
    { date: new Date('2024-01-20'), distance: 14.0 },
    { date: new Date('2024-01-22'), distance: 8.0 },
    { date: new Date('2024-01-23'), distance: 12.5 },
    { date: new Date('2024-01-24'), distance: 6.8 },
    { date: new Date('2024-01-26'), distance: 17.0 },
    { date: new Date('2024-01-27'), distance: 7.0 },
    { date: new Date('2024-01-28'), distance: 9.5 },
    { date: new Date('2024-01-30'), distance: 10.5 },
    { date: new Date('2024-01-31'), distance: 13.8 },
]
