import { describe, it, expect } from 'vitest'
import {
    blogPosts,
    runningPBs,
    friendsData,
    runningTraining,
    musicPosts,
} from '$lib/data'
import type { BlogCategory, RunningDistance } from '$lib/types'

// Central source of truth for valid enum-like data.
const VALID_BLOG_CATEGORIES: BlogCategory[] = ['science', 'running', 'music']
const VALID_RUNNING_DISTANCES: RunningDistance[] = [
    '5k',
    '10k',
    'Half Marathon',
    'Marathon',
]

describe('Data Integrity', () => {
    describe('blogPosts', () => {
        it('should contain a non-empty array', () => {
            expect(Array.isArray(blogPosts)).toBe(true)
            expect(blogPosts.length).toBeGreaterThan(0)
        })

        describe.each(blogPosts)('for blog post "$title"', (post) => {
            it('should have valid content and structure', () => {
                // Type check (Date object)
                expect(post.creationDate).toBeInstanceOf(Date)

                // Content validation (non-empty strings)
                expect(post.title.trim().length).toBeGreaterThan(0)
                expect(post.image.trim().length).toBeGreaterThan(0)
                expect(post.post.trim().length).toBeGreaterThan(0)

                // Business logic (categories must be from the allowed list)
                expect(Array.isArray(post.categories)).toBe(true)
                expect(post.categories.length).toBeGreaterThan(0)
                post.categories.forEach((category) => {
                    expect(VALID_BLOG_CATEGORIES).toContain(category)
                })
            })
        })
    })

    describe('musicPosts', () => {
        it('should contain a non-empty array', () => {
            expect(Array.isArray(musicPosts)).toBe(true)
            expect(musicPosts.length).toBeGreaterThan(0)
        })

        describe.each(musicPosts)('for music post "$title"', (post) => {
            it('should have valid content and structure', () => {
                // Type check
                expect(post.creationDate).toBeInstanceOf(Date)

                // Content validation (non-empty strings)
                expect(post.title.trim().length).toBeGreaterThan(0)
                expect(post.desc.trim().length).toBeGreaterThan(0)
                expect(post.image.trim().length).toBeGreaterThan(0)
                expect(post.iframe.trim().length).toBeGreaterThan(0)

                // Business logic
                expect(post.iframe).toContain('<iframe') // Simple check to ensure it's an iframe tag
                expect(Array.isArray(post.labels)).toBe(true)
                expect(post.labels.length).toBeGreaterThan(0)
                post.labels.forEach((label) => {
                    expect(typeof label).toBe('string')
                    expect(label.trim().length).toBeGreaterThan(0)
                })

                // 'post' can be an empty string, so we just check the type
                expect(typeof post.post).toBe('string')
            })
        })
    })

    describe('runningPBs', () => {
        it('should contain a non-empty array', () => {
            expect(Array.isArray(runningPBs)).toBe(true)
            expect(runningPBs.length).toBeGreaterThan(0)
        })

        it('should have PBs for all required distances', () => {
            const presentDistances = runningPBs.map((pb) => pb.distance)
            expect(presentDistances).toEqual(
                expect.arrayContaining(VALID_RUNNING_DISTANCES)
            )
        })

        describe.each(runningPBs)('for the $distance PB', (pb) => {
            it('should have valid content and structure', () => {
                expect(pb.eventDate).toBeInstanceOf(Date)
                expect(pb.eventLocation.trim().length).toBeGreaterThan(0)
                expect(pb.usedShoe.trim().length).toBeGreaterThan(0)

                // Business logic (distance must be from the allowed list)
                expect(VALID_RUNNING_DISTANCES).toContain(pb.distance)

                // Content validation (time format if it exists)
                if (pb.time) {
                    expect(pb.time).toMatch(/^((\d{1,2}:)?\d{1,2}:\d{2})$/)
                }
            })
        })
    })

    describe('friendsData', () => {
        it('should contain a non-empty array', () => {
            expect(Array.isArray(friendsData)).toBe(true)
            expect(friendsData.length).toBeGreaterThan(0)
        })

        it('should have unique friend names', () => {
            const names = friendsData.map((friend) => friend.name)
            const uniqueNames = new Set(names)
            expect(uniqueNames.size).toBe(friendsData.length)
        })

        describe.each(friendsData)('for friend "$name"', (friend) => {
            it('should have valid content', () => {
                expect(friend.name.trim().length).toBeGreaterThan(0)
                expect(friend.image.trim().length).toBeGreaterThan(0)
                expect(friend.text.trim().length).toBeGreaterThan(0)
                expect(friend.role.trim().length).toBeGreaterThan(0)
            })
        })
    })

    describe('runningTraining', () => {
        const MAX_REASONABLE_DISTANCE = 100 // Max km for a single day's training

        it('should contain a non-empty array', () => {
            expect(Array.isArray(runningTraining)).toBe(true)
            expect(runningTraining.length).toBeGreaterThan(0)
        })

        describe.each(runningTraining)(
            'for training on $date.toISOString()',
            (training) => {
                it('should have valid and reasonable values', () => {
                    expect(training.date).toBeInstanceOf(Date)
                    expect(typeof training.distance).toBe('number')

                    // Business logic (distance is within a reasonable range)
                    expect(training.distance).toBeGreaterThanOrEqual(0)
                    expect(training.distance).toBeLessThanOrEqual(
                        MAX_REASONABLE_DISTANCE
                    )
                })
            }
        )
    })
})
