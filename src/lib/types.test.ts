import { describe, it, expect } from 'vitest'
import type {
    BlogPost,
    RunningPB,
    FriendsData,
    RunningTraining,
    BlogCategory,
    RunningDistance,
} from './types'

describe('Type Definitions', () => {
    describe('BlogCategory', () => {
        it('should accept valid blog categories', () => {
            const validCategories: BlogCategory[] = [
                'science',
                'running',
                'music',
            ]
            expect(validCategories).toHaveLength(3)
            expect(validCategories).toContain('science')
            expect(validCategories).toContain('running')
            expect(validCategories).toContain('music')
        })
    })

    describe('RunningDistance', () => {
        it('should accept valid running distances', () => {
            const validDistances: RunningDistance[] = [
                '5k',
                '10k',
                'Half Marathon',
                'Marathon',
            ]
            expect(validDistances).toHaveLength(4)
            expect(validDistances).toContain('5k')
            expect(validDistances).toContain('10k')
            expect(validDistances).toContain('Half Marathon')
            expect(validDistances).toContain('Marathon')
        })
    })

    describe('BlogPost interface', () => {
        it('should have all required properties', () => {
            const blogPost: BlogPost = {
                creationDate: new Date('2024-01-15'),
                title: 'Test Post',
                image: '/images/test.jpg',
                labels: ['test', 'example'],
                post: '/posts/test.md',
                categories: ['science'],
            }

            expect(blogPost.creationDate).toBeInstanceOf(Date)
            expect(typeof blogPost.title).toBe('string')
            expect(typeof blogPost.image).toBe('string')
            expect(Array.isArray(blogPost.labels)).toBe(true)
            expect(typeof blogPost.post).toBe('string')
            expect(Array.isArray(blogPost.categories)).toBe(true)
        })
    })

    describe('RunningPB interface', () => {
        it('should have all required properties', () => {
            const runningPB: RunningPB = {
                eventDate: new Date('2024-01-10'),
                eventLocation: 'Central Park',
                distance: '5k',
                usedShoe: 'Nike Vaporfly',
                time: '18:45',
            }

            expect(runningPB.eventDate).toBeInstanceOf(Date)
            expect(typeof runningPB.eventLocation).toBe('string')
            expect(['5k', '10k', 'Half Marathon', 'Marathon']).toContain(
                runningPB.distance
            )
            expect(typeof runningPB.usedShoe).toBe('string')
            expect(typeof runningPB.time).toBe('string')
        })

        it('should allow optional time property', () => {
            const runningPBWithoutTime: RunningPB = {
                eventDate: new Date('2024-01-10'),
                eventLocation: 'Central Park',
                distance: '5k',
                usedShoe: 'Nike Vaporfly',
            }

            expect(runningPBWithoutTime.time).toBeUndefined()
        })
    })

    describe('FriendsData interface', () => {
        it('should have all required properties', () => {
            const friendsData: FriendsData = {
                name: 'John Doe',
                image: '/images/john.jpg',
                text: 'Great friend and colleague.',
                role: 'Stupid Asshole',
            }

            expect(typeof friendsData.name).toBe('string')
            expect(typeof friendsData.image).toBe('string')
            expect(typeof friendsData.text).toBe('string')
        })
    })

    describe('RunningTraining interface', () => {
        it('should have all required properties', () => {
            const runningTraining: RunningTraining = {
                date: new Date('2024-01-01'),
                distance: 10.5,
            }

            expect(runningTraining.date).toBeInstanceOf(Date)
            expect(typeof runningTraining.distance).toBe('number')
            expect(runningTraining.distance).toBeGreaterThanOrEqual(0)
        })
    })
})
