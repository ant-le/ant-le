import { describe, it, expect } from 'vitest'
import { blogPosts, runningPBs, friendsData, runningTraining } from './data'
import type { BlogCategory, RunningDistance } from './types'

describe('Data', () => {
    describe('mockBlogPosts', () => {
        it('should contain blog posts', () => {
            expect(blogPosts).toBeInstanceOf(Array)
            expect(blogPosts.length).toBeGreaterThan(0)
        })

        it('should have valid blog post structure', () => {
            blogPosts.forEach((post) => {
                expect(post.creationDate).toBeInstanceOf(Date)
                expect(typeof post.title).toBe('string')
                expect(typeof post.image).toBe('string')
                expect(Array.isArray(post.labels)).toBe(true)
                expect(typeof post.post).toBe('string')
                expect(Array.isArray(post.categories)).toBe(true)
            })
        })

        it('should have posts in different categories', () => {
            const categories = blogPosts.flatMap((post) => post.categories)
            const uniqueCategories = [...new Set(categories)]

            expect(uniqueCategories).toContain('science')
            expect(uniqueCategories).toContain('running')
            expect(uniqueCategories).toContain('music')
        })

        it('should have posts with valid categories', () => {
            const validCategories: BlogCategory[] = [
                'science',
                'running',
                'music',
            ]

            blogPosts.forEach((post) => {
                post.categories.forEach((category) => {
                    expect(validCategories).toContain(category)
                })
            })
        })

        it('should have posts with non-empty titles and images', () => {
            blogPosts.forEach((post) => {
                expect(post.title.length).toBeGreaterThan(0)
                expect(post.image.length).toBeGreaterThan(0)
                expect(post.post.length).toBeGreaterThan(0)
            })
        })
    })

    describe('mockRunningPBs', () => {
        it('should contain running PBs', () => {
            expect(runningPBs).toBeInstanceOf(Array)
            expect(runningPBs.length).toBeGreaterThan(0)
        })

        it('should have valid running PB structure', () => {
            runningPBs.forEach((pb) => {
                expect(pb.eventDate).toBeInstanceOf(Date)
                expect(typeof pb.eventLocation).toBe('string')
                expect(typeof pb.usedShoe).toBe('string')
                expect(pb.eventLocation.length).toBeGreaterThan(0)
                expect(pb.usedShoe.length).toBeGreaterThan(0)
            })
        })

        it('should have PBs for all distance types', () => {
            const distances = runningPBs.map((pb) => pb.distance)
            const validDistances: RunningDistance[] = [
                '5k',
                '10k',
                'Half Marathon',
                'Marathon',
            ]

            validDistances.forEach((distance) => {
                expect(distances).toContain(distance)
            })
        })

        it('should have valid distance values', () => {
            const validDistances: RunningDistance[] = [
                '5k',
                '10k',
                'Half Marathon',
                'Marathon',
            ]

            runningPBs.forEach((pb) => {
                expect(validDistances).toContain(pb.distance)
            })
        })

        it('should have time values for PBs', () => {
            runningPBs.forEach((pb) => {
                expect(typeof pb.time).toBe('string')
                expect(pb.time!.length).toBeGreaterThan(0)
            })
        })
    })

    describe('mockFriendsData', () => {
        it('should contain friends data', () => {
            expect(friendsData).toBeInstanceOf(Array)
            expect(friendsData.length).toBeGreaterThan(0)
        })

        it('should have valid friends data structure', () => {
            friendsData.forEach((friend) => {
                expect(typeof friend.name).toBe('string')
                expect(typeof friend.image).toBe('string')
                expect(typeof friend.text).toBe('string')
                expect(friend.name.length).toBeGreaterThan(0)
                expect(friend.image.length).toBeGreaterThan(0)
                expect(friend.text.length).toBeGreaterThan(0)
            })
        })

        it('should have unique friend names', () => {
            const names = friendsData.map((friend) => friend.name)
            const uniqueNames = [...new Set(names)]
            expect(uniqueNames.length).toBe(friendsData.length)
        })
    })

    describe('mockRunningTraining', () => {
        it('should contain training data', () => {
            expect(runningTraining).toBeInstanceOf(Array)
            expect(runningTraining.length).toBeGreaterThan(0)
        })

        it('should have valid training data structure', () => {
            runningTraining.forEach((training) => {
                expect(training.date).toBeInstanceOf(Date)
                expect(typeof training.distance).toBe('number')
                expect(training.distance).toBeGreaterThanOrEqual(0)
            })
        })

        it('should have training data for multiple days', () => {
            const uniqueDates = [
                ...new Set(runningTraining.map((t) => t.date.toDateString())),
            ]
            expect(uniqueDates.length).toBeGreaterThan(1)
        })

        it('should have some rest days (distance = 0)', () => {
            const restDays = runningTraining.filter((t) => t.distance === 0)
            expect(restDays.length).toBeGreaterThan(0)
        })

        it('should have some training days (distance > 0)', () => {
            const trainingDays = runningTraining.filter((t) => t.distance > 0)
            expect(trainingDays.length).toBeGreaterThan(0)
        })

        it('should have reasonable distance values', () => {
            runningTraining.forEach((training) => {
                expect(training.distance).toBeLessThanOrEqual(50) // Max 50km per day seems reasonable
            })
        })
    })
})
