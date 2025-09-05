import kglw from '$lib/assets/kglw.webp'
import serenity from '$lib/assets/serenity.webp'
import erase from '$lib/assets/erase.jpg'
import meddle from '$lib/assets/meddle.jpg'
import type { BlogPost } from '$lib/types/blog'

export interface MusicData extends BlogPost {
    iframe: string // ifrmae for spotify/apple/souncloud
    artist: string
    piece: string
}
export const musicPosts: MusicData[] = [
    {
        creationDate: new Date('2025-03-06'),
        piece: 'One of there days',
        artist: 'Pink Floyd',
        title: 'The best opening track of an album ever!',
        desc: `While there are definitely more recognised albums, I like Meddle a
        lot and especially its first song is just very special!`,
        image: meddle,
        labels: ['Rock', 'Album'],
        post: '', // Filepath to the full post
        categories: ['music'],
        iframe: `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/de/album/one-of-these-days/1065973614?i=1065973615&l=en-GB"></iframe>`,
    },
    {
        creationDate: new Date('2025-06-06'),
        artist: 'King Gizzard and the Lizard Wizard',
        piece: 'Motor Spirit',
        title: 'Introducing my Favourite Band',
        desc: `I should mention the entire album, but especually this one is really hitting me.`,
        image: kglw,
        labels: ['Metal', 'Song'],
        post: '', // Filepath to the full post
        iframe: `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/de/album/motor-spirit/1684380069?i=1684380385&l=en-GB"></iframe>`,
        categories: ['music'],
    },
    {
        creationDate: new Date('2024-06-06'),
        piece: 'Serenity',
        artist: 'Belocca & Nusha',
        title: 'My favourite electronic song from the past years',
        image: serenity,
        desc: `There are just some songs which never leave you. I was one of the first
        electronic which really got me. I listened to it, practiced with it, palyed it live, and I still cannot get enough.`,
        labels: ['Techno', 'Song'],
        post: '', // Filepath to the full post
        iframe: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1358620018&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
        categories: ['music'],
    },
    {
        creationDate: new Date('2025-09-06'),
        piece: 'Hand.Cannot.Erase',
        artist: 'Steven Wilson',
        title: 'My favourite album atm',
        desc: `I think that it will be different to reach the art of Pink Floys, but if I need to name one album, this would be it! - it creates an incredible atmosphere and takes you on a journey would won't regret!`,
        image: erase,
        labels: ['Rock', 'Album'],
        post: '', // Filepath to the full post
        categories: ['music'],
        iframe: `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/de/album/hand-cannot-erase-deluxe-edition/947842870?l=en-GB"></iframe>`,
    },
]
