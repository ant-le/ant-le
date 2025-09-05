import lama from '$lib/assets/lama.jpg'
import anton from '$lib/assets/anton.webp'
import tilman from '$lib/assets/tilman.jpg'
import kristian from '$lib/assets/kristian.jpg'

export interface FriendsData {
    name: string
    image: string
    text: string
    role: string
}

export const friendsData: FriendsData[] = [
    {
        name: 'Kristian Ristic',
        image: kristian,
        text: 'Anton is the single best thing ever happened to my life!',
        role: 'Professional couch potato',
    },
    {
        name: 'Tilman Kerl',
        image: tilman,
        text: `Some people have study groups. I had Anton.`,
        role: 'Coffee-addicted dude',
    },
    {
        name: 'Luca Salsetti',
        image: lama,
        text: 'He is a genius!',
        role: 'Just a random dude',
    },
    {
        name: 'Anton Lechuga',
        image: anton,
        text: 'I would recommend everyone to work with or talk to him!',
        role: 'Exceptional Mulit-Talent',
    },
]
