import kglw from '$lib/assets/kglw.webp'
import serenity from '$lib/assets/serenity.webp'
import type { BlogPost } from '$lib/types/blog'

export interface MusicData extends BlogPost {
    iframe: string // ifrmae for spotify/apple/souncloud
}
export const musicPosts: MusicData[] = [
    {
        creationDate: new Date('2025-06-06'),
        title: 'King Gizzard and the Lizard Wizard',
        desc: 'Introducing my Favourite Band',
        image: kglw,
        labels: ['KGLW', 'Rock'],
        post: '', // Filepath to the full post
        iframe: `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/de/album/motor-spirit/1684380069?i=1684380385&l=en-GB"></iframe>`,
        categories: ['music'],
    },
    {
        creationDate: new Date('2024-06-06'),
        title: 'Serenity',
        desc: 'My favourite electronic song from the past years',
        image: serenity,
        labels: ['Techno'],
        post: '', // Filepath to the full post
        iframe: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1358620018&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
        categories: ['music'],
    },
]
