import type {
    BlogPost,
    RunningPB,
    RunningTraining,
    BlogCategory,
} from './types'
import { blogPosts, runningPBs, runningTraining } from './data'

/**
 * Format date to a readable string
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Filter blog posts by category
 */
export function filterBlogPostsByCategory(
    posts: BlogPost[],
    category: BlogCategory
): BlogPost[] {
    return posts.filter((post) => post.categories.includes(category))
}

/**
 * Filter blog posts by label
 */
export function filterBlogPostsByLabel(
    posts: BlogPost[],
    label: string
): BlogPost[] {
    return posts.filter((post) => post.labels.includes(label))
}

/**
 * Filter blog posts by title (case-insensitive search)
 */
export function filterBlogPostsByTitle(
    posts: BlogPost[],
    searchTerm: string
): BlogPost[] {
    const term = searchTerm.toLowerCase()
    return posts.filter((post) => post.title.toLowerCase().includes(term))
}

/**
 * Sort blog posts by date (newest first)
 */
export function sortBlogPostsByDate(posts: BlogPost[]): BlogPost[] {
    return [...posts].sort(
        (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
    )
}

/**
 * Get random selection of blog posts
 */
export function getRandomBlogPosts(
    posts: BlogPost[],
    count: number
): BlogPost[] {
    const shuffled = [...posts].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

/**
 * Get running PBs sorted by distance (shortest to longest)
 */
export function getSortedRunningPBs(pbs: RunningPB[]): RunningPB[] {
    const distanceOrder = { '5k': 1, '10k': 2, 'Half Marathon': 3, Marathon: 4 }
    return [...pbs].sort(
        (a, b) => distanceOrder[a.distance] - distanceOrder[b.distance]
    )
}

/**
 * Get weekly running training data
 */
export function getWeeklyTrainingData(
    training: RunningTraining[]
): { week: string; totalDistance: number }[] {
    const weeklyData = new Map<string, number>()

    training.forEach((entry) => {
        const weekStart = new Date(entry.date)
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of week (Sunday)
        const weekKey = weekStart.toISOString().split('T')[0]

        weeklyData.set(weekKey, (weeklyData.get(weekKey) || 0) + entry.distance)
    })

    return Array.from(weeklyData.entries())
        .map(([week, totalDistance]) => ({ week, totalDistance }))
        .sort((a, b) => a.week.localeCompare(b.week))
}

/**
 * Get total distance for a specific time period
 */
export function getTotalDistanceForPeriod(
    training: RunningTraining[],
    startDate: Date,
    endDate: Date
): number {
    return training
        .filter((entry) => entry.date >= startDate && entry.date <= endDate)
        .reduce((total, entry) => total + entry.distance, 0)
}

/**
 * Get average daily distance for a period
 */
export function getAverageDailyDistance(
    training: RunningTraining[],
    startDate: Date,
    endDate: Date
): number {
    const periodTraining = training.filter(
        (entry) => entry.date >= startDate && entry.date <= endDate
    )
    const totalDistance = periodTraining.reduce(
        (total, entry) => total + entry.distance,
        0
    )
    const daysWithTraining = periodTraining.filter(
        (entry) => entry.distance > 0
    ).length

    return daysWithTraining > 0 ? totalDistance / daysWithTraining : 0
}

/**
 * Get total distance across all years
 */
export function getTotalDistanceAllYears(training: RunningTraining[]): number {
    return training.reduce((total, entry) => total + entry.distance, 0)
}

/**
 * Get weekly average distance for a specific year
 */
export function getWeeklyAverageForYear(
    training: RunningTraining[],
    year: number
): number {
    const yearStart = new Date(year, 0, 1)
    const yearEnd = new Date(year, 11, 31)

    const yearTraining = training.filter(
        (entry) => entry.date >= yearStart && entry.date <= yearEnd
    )

    if (yearTraining.length === 0) return 0

    const totalDistance = yearTraining.reduce(
        (total, entry) => total + entry.distance,
        0
    )

    // Calculate weeks in the year (52.1775 weeks per year on average)
    const weeksInYear = 52.1775

    return totalDistance / weeksInYear
}
