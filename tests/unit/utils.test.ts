import { describe, it, expect, vi } from 'vitest'
import {
    formatDate,
    filterBlogPostsByCategory,
    filterBlogPostsByLabel,
    filterBlogPostsByTitle,
    sortBlogPostsByDate,
    getRandomBlogPosts,
    getSortedRunningPBs,
    getWeeklyTrainingData,
    getTotalDistanceForPeriod,
    getAverageDailyDistance,
    getTotalDistanceAllYears,
    getWeeklyAverageForYear,
} from '$lib/utils'
import { blogPosts, runningPBs, runningTraining } from '$lib/data' // Real data for integration checks
import type { BlogCategory, BlogPost } from '$lib/types'

// --- Centralized Test Constants & Mocks ---
const VALID_CATEGORIES: BlogCategory[] = ['science', 'running', 'music']
const MOCK_POSTS: BlogPost[] = [
    {
        creationDate: new Date('2024-01-10'),
        title: 'Quantum Physics Explained',
        labels: ['quantum', 'physics'],
        post: '',
        image: '',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-03-15'),
        title: 'A Guide to Marathon Running',
        labels: ['marathon', 'training'],
        post: '',
        image: '',
        categories: ['running'],
    },
    {
        creationDate: new Date('2024-02-20'),
        title: 'The Art of Music Production',
        labels: ['music', 'production'],
        post: '',
        image: '',
        categories: ['music'],
    },
]
const MOCK_TRAINING_DATA = [
    { date: new Date('2024-01-01'), distance: 10 },
    { date: new Date('2024-01-02'), distance: 0 }, // Rest day
    { date: new Date('2024-01-08'), distance: 15 },
    { date: new Date('2025-02-01'), distance: 20 }, // Data for another year
]

describe('Utility Functions', () => {
    // --- Date Formatting ---
    describe('formatDate', () => {
        it('should format a date into a "Month Day, Year" string', () => {
            const date = new Date('2024-10-23T10:00:00Z')
            expect(formatDate(date)).toBe('October 23, 2024')
        })
    })

    // --- Blog Post Filtering & Sorting ---
    describe('filterBlogPostsByCategory', () => {
        it.each(VALID_CATEGORIES)(
            'should correctly filter posts for the "%s" category',
            (category) => {
                const result = filterBlogPostsByCategory(MOCK_POSTS, category)
                expect(result.length).toBe(1)
                expect(result[0].categories).toContain(category)
            }
        )

        it('should return an empty array for a non-existent category', () => {
            const result = filterBlogPostsByCategory(
                MOCK_POSTS,
                'non-existent' as any
            )
            expect(result).toEqual([])
        })
    })

    describe('filterBlogPostsByLabel', () => {
        it('should filter posts by an existing label', () => {
            const result = filterBlogPostsByLabel(MOCK_POSTS, 'quantum')
            expect(result.length).toBe(1)
            expect(result[0].labels).toContain('quantum')
        })

        it('should be case-sensitive and return empty for wrong case', () => {
            const result = filterBlogPostsByLabel(MOCK_POSTS, 'QUANTUM')
            expect(result).toEqual([])
        })
    })

    describe('filterBlogPostsByTitle', () => {
        it.each([
            { searchTerm: 'Quantum', expectedCount: 1 },
            { searchTerm: 'quantum', expectedCount: 1 }, // Case-insensitive
            { searchTerm: 'Art', expectedCount: 1 }, // Partial match
            { searchTerm: 'non-existent', expectedCount: 0 },
        ])(
            'should return $expectedCount post(s) for search term "$searchTerm"',
            ({ searchTerm, expectedCount }) => {
                const result = filterBlogPostsByTitle(MOCK_POSTS, searchTerm)
                expect(result.length).toBe(expectedCount)
            }
        )
    })

    describe('sortBlogPostsByDate', () => {
        it('should sort posts by date (newest first)', () => {
            const sorted = sortBlogPostsByDate(MOCK_POSTS)
            // Expected order: Mar 15, Feb 20, Jan 10
            expect(sorted[0].title).toBe('A Guide to Marathon Running')
            expect(sorted[1].title).toBe('The Art of Music Production')
            expect(sorted[2].title).toBe('Quantum Physics Explained')
        })

        it('should not modify the original array', () => {
            const originalPosts = [...MOCK_POSTS]
            sortBlogPostsByDate(originalPosts)
            expect(originalPosts).toEqual(MOCK_POSTS)
        })
    })

    describe('getRandomBlogPosts', () => {
        it('should return the specified number of posts', () => {
            const result = getRandomBlogPosts(MOCK_POSTS, 2)
            expect(result.length).toBe(2)
        })

        it('should be deterministic when Math.random is mocked', () => {
            const spy = vi.spyOn(Math, 'random').mockReturnValue(0.1)
            const result = getRandomBlogPosts(MOCK_POSTS, 2)
            expect(result.map((p) => p.title)).toContain(
                'Quantum Physics Explained'
            )
            spy.mockRestore()
        })
    })

    // --- Running Data Calculations ---
    describe('getSortedRunningPBs', () => {
        it('should sort PBs by the correct distance order', () => {
            const sorted = getSortedRunningPBs(runningPBs)
            const distanceOrder = sorted.map((pb) => pb.distance)
            // This test uses the real data to confirm the expected final order
            expect(distanceOrder).toEqual([
                '5k',
                '10k',
                'Half Marathon',
                'Marathon',
            ])
        })
    })

    describe('getWeeklyTrainingData', () => {
        it('should aggregate distances correctly by week', () => {
            const weeklyData = getWeeklyTrainingData(MOCK_TRAINING_DATA)
            expect(weeklyData.length).toBe(3) // Three distinct weeks
            expect(weeklyData[0].totalDistance).toBe(10) // First week
            expect(weeklyData[1].totalDistance).toBe(15) // Second week
        })
    })

    describe('getTotalDistanceForPeriod', () => {
        it('should calculate total distance for a specific period', () => {
            const startDate = new Date('2023-12-30')
            const endDate = new Date('2024-01-10')
            const total = getTotalDistanceForPeriod(
                MOCK_TRAINING_DATA,
                startDate,
                endDate
            )
            expect(total).toBe(25) // 10 + 15
        })
    })

    describe('getAverageDailyDistance', () => {
        it('should calculate average distance excluding rest days', () => {
            const startDate = new Date('2024-01-01')
            const endDate = new Date('2024-01-07')
            // Period has one run of 10km and one rest day. Average is 10 / 1 = 10.
            const average = getAverageDailyDistance(
                MOCK_TRAINING_DATA,
                startDate,
                endDate
            )
            expect(average).toBe(10)
        })

        it('should return 0 if there are no training days in the period', () => {
            const startDate = new Date('2026-01-01')
            const endDate = new Date('2026-01-07')
            const average = getAverageDailyDistance(
                MOCK_TRAINING_DATA,
                startDate,
                endDate
            )
            expect(average).toBe(0)
        })
    })

    describe('getTotalDistanceAllYears', () => {
        it('should calculate the sum of all distances', () => {
            const total = getTotalDistanceAllYears(MOCK_TRAINING_DATA)
            expect(total).toBe(45) // 10 + 15 + 20
        })

        it('should return 0 for an empty array', () => {
            const total = getTotalDistanceAllYears([])
            expect(total).toBe(0)
        })
    })

    describe('getWeeklyAverageForYear', () => {
        it('should calculate the correct weekly average for a given year', () => {
            const average = getWeeklyAverageForYear(MOCK_TRAINING_DATA, 2024)
            const expectedTotal = 25 // 10 + 15
            expect(average).toBeCloseTo(expectedTotal / 52.1775)
        })

        it('should return 0 for a year with no training data', () => {
            const average = getWeeklyAverageForYear(MOCK_TRAINING_DATA, 2026)
            expect(average).toBe(0)
        })

        it('should return 0 for an empty input array', () => {
            const average = getWeeklyAverageForYear([], 2024)
            expect(average).toBe(0)
        })
    })
})
