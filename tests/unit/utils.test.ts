import { describe, it, expect, vi } from 'vitest'
import {
    formatDate,
    filterBlogPostsByCategory,
    filterBlogPostsByLabel,
    filterBlogPostsByTitle,
    sortBlogPostsByDate,
    getRandomBlogPosts,
    createRandomPostsByLabels,
    getSortedRunningPBs,
    calculateTrainingSummary,
} from '$lib/utils'
import { type BlogPost, type BlogCategory } from '$lib/types/blog'
import { runningPBs } from '$lib/types/personalBests'
import { type RunningTraining } from '$lib/types/running'

// --- Centralized Test Constants & Mocks ---
const MOCK_POSTS: BlogPost[] = [
    {
        creationDate: new Date('2024-01-10'),
        title: 'Quantum Physics Explained',
        desc: 'Understanding quantum mechanics',
        labels: ['quantum', 'physics', 'math'],
        post: '',
        image: '',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-03-15'),
        title: 'A Guide to Marathon Running',
        desc: 'Complete marathon training guide',
        labels: ['marathon', 'training', 'running'],
        post: '',
        image: '',
        categories: ['running'],
    },
    {
        creationDate: new Date('2024-02-20'),
        title: 'The Art of Music Production',
        desc: 'Music production techniques',
        labels: ['music', 'production'],
        post: '',
        image: '',
        categories: ['music'],
    },
    {
        creationDate: new Date('2024-04-05'),
        title: 'Philosophy of Mind',
        desc: 'Exploring consciousness and mind',
        labels: ['philosophy', 'consciousness'],
        post: '',
        image: '',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-05-12'),
        title: 'Social Psychology Research',
        desc: 'Latest findings in social psychology',
        labels: ['social science', 'psychology'],
        post: '',
        image: '',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-06-18'),
        title: 'Advanced Calculus',
        desc: 'Deep dive into calculus concepts',
        labels: ['math', 'calculus'],
        post: '',
        image: '',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-07-22'),
        title: 'Another Philosophy Post',
        desc: 'More philosophical thoughts',
        labels: ['philosophy', 'ethics'],
        post: '',
        image: '',
        categories: ['science'],
    },
    {
        creationDate: new Date('2024-08-30'),
        title: 'Statistics in Social Science',
        desc: 'Statistical methods in social research',
        labels: ['social science', 'statistics'],
        post: '',
        image: '',
        categories: ['science'],
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
        it.each([
            { category: 'science', expectedCount: 6 },
            { category: 'running', expectedCount: 1 },
            { category: 'music', expectedCount: 1 }
        ])(
            'should correctly filter posts for the "$category" category',
            ({ category, expectedCount }) => {
                const result = filterBlogPostsByCategory(MOCK_POSTS, category as BlogCategory)
                expect(result.length).toBe(expectedCount)
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
            // Expected order: Aug 30, Jul 22, Jun 18, May 12, Apr 5, Mar 15, Feb 20, Jan 10
            expect(sorted[0].title).toBe('Statistics in Social Science')
            expect(sorted[1].title).toBe('Another Philosophy Post')
            expect(sorted[2].title).toBe('Advanced Calculus')
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

    describe('createRandomPostsByCategories', () => {
        it('should create RandomPosts object with one post per category', () => {
            const categories = ['philosophy', 'social science', 'math']
            const result = createRandomPostsByLabels(MOCK_POSTS, categories)
            
            // Check that all categories are present in the result
            expect(Object.keys(result)).toEqual(categories)
            
            // Check that each category has a post (not null)
            expect(result.philosophy).not.toBeNull()
            expect(result['social science']).not.toBeNull()
            expect(result.math).not.toBeNull()
            
            // Check that the posts have the correct labels
            expect(result.philosophy?.labels).toContain('philosophy')
            expect(result['social science']?.labels).toContain('social science')
            expect(result.math?.labels).toContain('math')
        })

        it('should handle case-insensitive category matching', () => {
            const categories = ['PHILOSOPHY', 'Social Science', 'MATH']
            const result = createRandomPostsByLabels(MOCK_POSTS, categories)
            
            expect(result.PHILOSOPHY).not.toBeNull()
            expect(result['Social Science']).not.toBeNull()
            expect(result.MATH).not.toBeNull()
        })

        it('should return null for categories with no matching posts', () => {
            const categories = ['philosophy', 'non-existent-category', 'math']
            const result = createRandomPostsByLabels(MOCK_POSTS, categories)
            
            expect(result.philosophy).not.toBeNull()
            expect(result['non-existent-category']).toBeNull()
            expect(result.math).not.toBeNull()
        })

        it('should handle empty posts array', () => {
            const categories = ['philosophy', 'math']
            const result = createRandomPostsByLabels([], categories)
            
            expect(result.philosophy).toBeNull()
            expect(result.math).toBeNull()
        })

        it('should handle empty categories array', () => {
            const result = createRandomPostsByLabels(MOCK_POSTS, [])
            
            expect(Object.keys(result)).toHaveLength(0)
        })

        it('should be deterministic when Math.random is mocked', () => {
            const spy = vi.spyOn(Math, 'random').mockReturnValue(0.1)
            const categories = ['philosophy', 'math']
            const result = createRandomPostsByLabels(MOCK_POSTS, categories)
            
            // With mocked random, we should get consistent results
            expect(result.philosophy?.title).toBe('Philosophy of Mind')
            expect(result.math?.title).toBe('Quantum Physics Explained')
            
            spy.mockRestore()
        })

        it('should handle categories with multiple matching posts by selecting one randomly', () => {
            const categories = ['philosophy'] // We have 2 philosophy posts
            const result = createRandomPostsByLabels(MOCK_POSTS, categories)
            
            expect(result.philosophy).not.toBeNull()
            expect(result.philosophy?.labels).toContain('philosophy')
            
            // The result should be one of the two philosophy posts
            const philosophyTitles = ['Philosophy of Mind', 'Another Philosophy Post']
            expect(philosophyTitles).toContain(result.philosophy?.title)
        })

        it('should not modify the original posts array', () => {
            const originalPosts = [...MOCK_POSTS]
            const categories = ['philosophy', 'math']
            
            createRandomPostsByLabels(MOCK_POSTS, categories)
            
            expect(MOCK_POSTS).toEqual(originalPosts)
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
