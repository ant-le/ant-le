export type RunningDistance = '5k' | '10k' | 'Half Marathon' | 'Marathon'

export interface RunningPB {
    eventDate: Date
    eventLocation: string
    distance: RunningDistance
    usedShoe: string
    time: string
}

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
