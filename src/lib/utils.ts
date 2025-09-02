import type {
    BlogPost,
    BlogCategory,
    RunningPB,
    RunningTraining,
    WeeklyTrainingSummary,
} from '$lib/types'

/**
 * Formats a Date object into a readable "Month Day, Year" string.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Filters blog posts by a given category.
 * @param posts The array of blog posts.
 * @param category The category to filter by.
 * @returns A new array of filtered blog posts.
 */
export function filterBlogPostsByCategory(
    posts: BlogPost[],
    category: BlogCategory
): BlogPost[] {
    if (!posts || posts.length === 0) return []
    return posts.filter((post) => post.categories.includes(category))
}

/**
 * Filters blog posts by a given label (case-sensitive).
 * @param posts The array of blog posts.
 * @param label The label to filter by.
 * @returns A new array of filtered blog posts.
 */
export function filterBlogPostsByLabel(
    posts: BlogPost[],
    label: string
): BlogPost[] {
    if (!posts || posts.length === 0) return []
    return posts.filter((post) => post.labels.includes(label))
}

/**
 * Filters blog posts by a title search term (case-insensitive).
 * @param posts The array of blog posts.
 * @param searchTerm The term to search for in post titles.
 * @returns A new array of filtered blog posts.
 */
export function filterBlogPostsByTitle(
    posts: BlogPost[],
    searchTerm: string
): BlogPost[] {
    if (!posts || posts.length === 0) return []
    const term = searchTerm.toLowerCase()
    return posts.filter((post) => post.title.toLowerCase().includes(term))
}

/**
 * Sorts blog posts by creation date (newest first).
 * @param posts The array of blog posts.
 * @returns A new, sorted array of blog posts.
 */
export function sortBlogPostsByDate(posts: BlogPost[]): BlogPost[] {
    if (!posts || posts.length === 0) return []
    return [...posts].sort(
        (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
    )
}

/**
 * Gets a random selection of blog posts.
 * @param posts The array of blog posts.
 * @param count The number of random posts to return.
 * @returns A new array with a random selection of posts.
 */
export function getRandomBlogPosts(
    posts: BlogPost[],
    count: number
): BlogPost[] {
    if (!posts || posts.length === 0 || count <= 0) return []
    const shuffled = [...posts].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

/**
 * Sorts running PBs by distance (shortest to longest).
 * @param pbs The array of running PBs.
 * @returns A new, sorted array of running PBs.
 */
export function getSortedRunningPBs(pbs: RunningPB[]): RunningPB[] {
    if (!pbs || pbs.length === 0) return []
    const distanceOrder = { '5k': 1, '10k': 2, 'Half Marathon': 3, Marathon: 4 }
    return [...pbs].sort(
        (a, b) => distanceOrder[a.distance] - distanceOrder[b.distance]
    )
}

/**
 * Aggregates daily training data into weekly totals.
 * @param training The array of running training entries.
 * @returns A sorted array of weekly training summaries.
 */
export function getWeeklyTrainingData(
    training: RunningTraining[]
): WeeklyTrainingSummary[] {
    if (!training || training.length === 0) return []

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
 * Calculates the total running distance within a given date range (inclusive).
 * @param training The array of running training entries.
 * @param startDate The start of the period.
 * @param endDate The end of the period.
 * @returns The total distance for the period.
 */
export function getTotalDistanceForPeriod(
    training: RunningTraining[],
    startDate: Date,
    endDate: Date
): number {
    if (!training || training.length === 0) return 0
    return training
        .filter((entry) => entry.date >= startDate && entry.date <= endDate)
        .reduce((total, entry) => total + entry.distance, 0)
}

/**
 * Calculates the average daily distance for days with training, within a specific period.
 * @param training The array of running training entries.
 * @param startDate The start of the period.
 * @param endDate The end of the period.
 * @returns The average distance, excluding rest days.
 */
export function getAverageDailyDistance(
    training: RunningTraining[],
    startDate: Date,
    endDate: Date
): number {
    if (!training || training.length === 0) return 0

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
 * Calculates the total distance across all training entries.
 * @param training The array of running training entries.
 * @returns The total distance.
 */
export function getTotalDistanceAllYears(training: RunningTraining[]): number {
    if (!training || training.length === 0) return 0
    return training.reduce((total, entry) => total + entry.distance, 0)
}

/**
 * Calculates the weekly average distance for a specific year.
 * @param training The array of running training entries.
 * @param year The year to calculate the average for.
 * @returns The average weekly distance for that year.
 */
export function getWeeklyAverageForYear(
    training: RunningTraining[],
    year: number
): number {
    if (!training || training.length === 0) return 0

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
    const weeksInYear = 52.1775 // Average weeks in a year
    return totalDistance / weeksInYear
}
