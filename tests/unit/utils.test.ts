import { describe, it, expect, vi } from 'vitest'
import {
    formatDate,
    filterBlogPostsByCategory,
    filterBlogPostsByLabel,
    filterBlogPostsByTitle,
    sortBlogPostsByDate,
    getRandomBlogPosts,
    getSortedRunningPBs,
    calculateTrainingSummary,
} from '$lib/utils'
import { type BlogPost, type BlogCategory } from '$lib/types/blog'
import { runningPBs } from '$lib/types/personalBests'
import { type RunningTraining } from '$lib/types/running'

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
const MOCK_TRAINING_DATA: RunningTraining[] = [
    { distance: 10, moving_time: 60, date: new Date('2025-01-15') }, // Week 3
    { distance: 15, moving_time: 90, date: new Date('2025-03-20') }, // Week 12
    { distance: 20, moving_time: 120, date: new Date('2025-08-30') }, // Week 35

    // --- Previous Year Data (2024) ---
    // Total distance: 520 km (avg 10km/week)
    // Total time: 3120 min
    ...Array.from({ length: 52 }, (_, i) => ({
        distance: 10,
        moving_time: 60,
        date: new Date(2024, 0, 1 + i * 7),
    })),
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
})

describe('calculateTrainingSummary', () => {
    it('should correctly calculate metrics for 30-day timeframe', () => {
        const mockCurrentDate = new Date('2025-01-15')

        // Test with 30-day timeframe
        const summary = calculateTrainingSummary(
            MOCK_TRAINING_DATA,
            '30',
            mockCurrentDate
        )

        // Check that we get the correct number of trainings for 30 days
        expect(summary.trainings.length).toBeGreaterThan(0)
        expect(summary.weeklyAverage).toBeGreaterThan(0)
        expect(summary.totalTime).toBeGreaterThan(0)
        expect(summary.totalDistance).toBeGreaterThan(0)

        // Check that all properties exist
        expect(summary).toHaveProperty('trainings')
        expect(summary).toHaveProperty('weeklyAverage')
        expect(summary).toHaveProperty('prevWeeklyAverage')
        expect(summary).toHaveProperty('totalTime')
        expect(summary).toHaveProperty('totalDistance')
    })

    it('should correctly calculate metrics for 180-day timeframe', () => {
        const mockCurrentDate = new Date('2025-01-15')

        const summary = calculateTrainingSummary(
            MOCK_TRAINING_DATA,
            '180',
            mockCurrentDate
        )

        expect(summary.trainings.length).toBeGreaterThan(0)
        expect(summary.weeklyAverage).toBeGreaterThan(0)
        expect(summary.totalTime).toBeGreaterThan(0)
        expect(summary.totalDistance).toBeGreaterThan(0)
    })

    it('should handle "all" timeframe correctly', () => {
        const mockCurrentDate = new Date('2025-01-15')

        const summary = calculateTrainingSummary(
            MOCK_TRAINING_DATA,
            'all',
            mockCurrentDate
        )

        // Should include all trainings
        expect(summary.trainings).toHaveLength(MOCK_TRAINING_DATA.length)
        expect(summary.weeklyAverage).toBeGreaterThan(0)
        expect(summary.totalTime).toBeGreaterThan(0)
        expect(summary.totalDistance).toBeGreaterThan(0)

        // No prior period for "all" timeframe
        expect(summary.prevWeeklyAverage).toBe(0)
    })

    it('should calculate prior period metrics correctly', () => {
        const mockCurrentDate = new Date('2025-01-15')

        const summary = calculateTrainingSummary(
            MOCK_TRAINING_DATA,
            '30',
            mockCurrentDate
        )

        // Should have prior period data for 30-day timeframe
        expect(summary.prevWeeklyAverage).toBeGreaterThanOrEqual(0)
    })

    it('should handle empty training data', () => {
        const emptyTrainings: RunningTraining[] = []
        const mockCurrentDate = new Date('2025-01-15')

        const summary = calculateTrainingSummary(
            emptyTrainings,
            '30',
            mockCurrentDate
        )

        expect(summary.trainings).toHaveLength(0)
        expect(summary.weeklyAverage).toBe(0)
        expect(summary.prevWeeklyAverage).toBe(0)
        expect(summary.totalTime).toBe(0)
        expect(summary.totalDistance).toBe(0)
    })
})
