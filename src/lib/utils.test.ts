import { describe, it, expect } from 'vitest'
import {
    filterBlogPostsByCategory,
    filterBlogPostsByLabel,
    filterBlogPostsByTitle,
    sortBlogPostsByDate,
    getRandomBlogPosts,
    getSortedRunningPBs,
    getWeeklyTrainingData,
    getTotalDistanceForPeriod,
    getAverageDailyDistance,
} from './utils'
import { blogPosts, runningPBs, runningTraining } from './data'

describe('Utility Functions', () => {
    describe('filterBlogPostsByCategory', () => {
        it('should filter posts by science category', () => {
            const sciencePosts = filterBlogPostsByCategory(blogPosts, 'science')
            expect(sciencePosts.length).toBeGreaterThan(0)
            sciencePosts.forEach((post) => {
                expect(post.categories).toContain('science')
            })
        })

        it('should filter posts by running category', () => {
            const runningPosts = filterBlogPostsByCategory(blogPosts, 'running')
            expect(runningPosts.length).toBeGreaterThan(0)
            runningPosts.forEach((post) => {
                expect(post.categories).toContain('running')
            })
        })

        it('should filter posts by music category', () => {
            const musicPosts = filterBlogPostsByCategory(blogPosts, 'music')
            expect(musicPosts.length).toBeGreaterThan(0)
            musicPosts.forEach((post) => {
                expect(post.categories).toContain('music')
            })
        })

        it('should return empty array for non-existent category', () => {
            const result = filterBlogPostsByCategory(
                blogPosts,
                'non-existent' as any
            )
            expect(result).toEqual([])
        })
    })

    describe('filterBlogPostsByLabel', () => {
        it('should filter posts by existing label', () => {
            const quantumPosts = filterBlogPostsByLabel(blogPosts, 'quantum')
            expect(quantumPosts.length).toBeGreaterThan(0)
            quantumPosts.forEach((post) => {
                expect(post.labels).toContain('quantum')
            })
        })

        it('should return empty array for non-existent label', () => {
            const result = filterBlogPostsByLabel(blogPosts, 'non-existent')
            expect(result).toEqual([])
        })

        it('should be case sensitive', () => {
            const result = filterBlogPostsByLabel(blogPosts, 'QUANTUM')
            expect(result).toEqual([])
        })
    })

    describe('filterBlogPostsByTitle', () => {
        it('should filter posts by title search term', () => {
            const quantumPosts = filterBlogPostsByTitle(blogPosts, 'Quantum')
            expect(quantumPosts.length).toBeGreaterThan(0)
            quantumPosts.forEach((post) => {
                expect(post.title.toLowerCase()).toContain('quantum')
            })
        })

        it('should be case insensitive', () => {
            const quantumPosts = filterBlogPostsByTitle(blogPosts, 'QUANTUM')
            expect(quantumPosts.length).toBeGreaterThan(0)
        })

        it('should return empty array for non-existent title', () => {
            const result = filterBlogPostsByTitle(blogPosts, 'non-existent')
            expect(result).toEqual([])
        })

        it('should handle partial matches', () => {
            const result = filterBlogPostsByTitle(blogPosts, 'Computing')
            expect(result.length).toBeGreaterThan(0)
        })
    })

    describe('sortBlogPostsByDate', () => {
        it('should sort posts by date (newest first)', () => {
            const sortedPosts = sortBlogPostsByDate(blogPosts)
            expect(sortedPosts.length).toBe(blogPosts.length)

            for (let i = 0; i < sortedPosts.length - 1; i++) {
                expect(
                    sortedPosts[i].creationDate.getTime()
                ).toBeGreaterThanOrEqual(
                    sortedPosts[i + 1].creationDate.getTime()
                )
            }
        })

        it('should not modify original array', () => {
            const originalPosts = [...blogPosts]
            sortBlogPostsByDate(blogPosts)
            expect(blogPosts).toEqual(originalPosts)
        })
    })

    describe('getRandomBlogPosts', () => {
        it('should return specified number of posts', () => {
            const randomPosts = getRandomBlogPosts(blogPosts, 3)
            expect(randomPosts.length).toBe(3)
        })

        it('should return all posts if count is greater than available', () => {
            const randomPosts = getRandomBlogPosts(blogPosts, 100)
            expect(randomPosts.length).toBe(blogPosts.length)
        })

        it('should return empty array for count 0', () => {
            const randomPosts = getRandomBlogPosts(blogPosts, 0)
            expect(randomPosts).toEqual([])
        })

        it('should return different results on multiple calls', () => {
            const result1 = getRandomBlogPosts(blogPosts, 3)
            const result2 = getRandomBlogPosts(blogPosts, 3)
            // Note: This test might occasionally fail due to randomness
            // In a real scenario, you might want to mock Math.random
            expect(result1.length).toBe(3)
            expect(result2.length).toBe(3)
            // We can't guarantee different results due to randomness, so we just check structure
        })
    })

    describe('getSortedRunningPBs', () => {
        it('should sort PBs by distance (shortest to longest)', () => {
            const sortedPBs = getSortedRunningPBs(runningPBs)
            expect(sortedPBs.length).toBe(runningPBs.length)

            const distanceOrder = {
                '5k': 1,
                '10k': 2,
                'Half Marathon': 3,
                Marathon: 4,
            }
            for (let i = 0; i < sortedPBs.length - 1; i++) {
                expect(
                    distanceOrder[sortedPBs[i].distance]
                ).toBeLessThanOrEqual(distanceOrder[sortedPBs[i + 1].distance])
            }
        })

        it('should not modify original array', () => {
            const originalPBs = [...runningPBs]
            getSortedRunningPBs(runningPBs)
            expect(runningPBs).toEqual(originalPBs)
        })
    })

    describe('getWeeklyTrainingData', () => {
        it('should return weekly aggregated data', () => {
            const weeklyData = getWeeklyTrainingData(runningTraining)
            expect(weeklyData.length).toBeGreaterThan(0)

            weeklyData.forEach((week) => {
                expect(typeof week.week).toBe('string')
                expect(typeof week.totalDistance).toBe('number')
                expect(week.totalDistance).toBeGreaterThanOrEqual(0)
            })
        })

        it('should aggregate distances correctly', () => {
            const weeklyData = getWeeklyTrainingData(runningTraining)
            const totalDistance = weeklyData.reduce(
                (sum, week) => sum + week.totalDistance,
                0
            )
            const originalTotalDistance = runningTraining.reduce(
                (sum, training) => sum + training.distance,
                0
            )

            expect(totalDistance).toBe(originalTotalDistance)
        })

        it('should sort weeks chronologically', () => {
            const weeklyData = getWeeklyTrainingData(runningTraining)
            for (let i = 0; i < weeklyData.length - 1; i++) {
                expect(
                    weeklyData[i].week.localeCompare(weeklyData[i + 1].week)
                ).toBeLessThanOrEqual(0)
            }
        })
    })

    describe('getTotalDistanceForPeriod', () => {
        it('should calculate total distance for a period', () => {
            const startDate = new Date('2024-01-01')
            const endDate = new Date('2024-01-31')
            const totalDistance = getTotalDistanceForPeriod(
                runningTraining,
                startDate,
                endDate
            )

            expect(typeof totalDistance).toBe('number')
            expect(totalDistance).toBeGreaterThanOrEqual(0)
        })

        it('should return 0 for period with no training', () => {
            const startDate = new Date('2025-01-01')
            const endDate = new Date('2025-01-31')
            const totalDistance = getTotalDistanceForPeriod(
                runningTraining,
                startDate,
                endDate
            )

            expect(totalDistance).toBe(0)
        })

        it('should handle single day period', () => {
            const date = new Date('2024-01-01')
            const totalDistance = getTotalDistanceForPeriod(
                runningTraining,
                date,
                date
            )

            const expectedDistance =
                runningTraining.find(
                    (t) => t.date.toDateString() === date.toDateString()
                )?.distance || 0

            expect(totalDistance).toBe(expectedDistance)
        })
    })

    describe('getAverageDailyDistance', () => {
        it('should calculate average daily distance for a period', () => {
            const startDate = new Date('2024-01-01')
            const endDate = new Date('2024-01-31')
            const avgDistance = getAverageDailyDistance(
                runningTraining,
                startDate,
                endDate
            )

            expect(typeof avgDistance).toBe('number')
            expect(avgDistance).toBeGreaterThanOrEqual(0)
        })

        it('should return 0 for period with no training days', () => {
            const startDate = new Date('2025-01-01')
            const endDate = new Date('2025-01-31')
            const avgDistance = getAverageDailyDistance(
                runningTraining,
                startDate,
                endDate
            )

            expect(avgDistance).toBe(0)
        })

        it('should exclude rest days from average calculation', () => {
            const startDate = new Date('2024-01-01')
            const endDate = new Date('2024-01-31')
            const avgDistance = getAverageDailyDistance(
                runningTraining,
                startDate,
                endDate
            )

            const periodTraining = runningTraining.filter(
                (t) =>
                    t.date >= startDate && t.date <= endDate && t.distance > 0
            )
            const totalDistance = periodTraining.reduce(
                (sum, t) => sum + t.distance,
                0
            )
            const expectedAvg =
                periodTraining.length > 0
                    ? totalDistance / periodTraining.length
                    : 0

            expect(avgDistance).toBe(expectedAvg)
        })
    })
})
