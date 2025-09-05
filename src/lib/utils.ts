import type { BlogPost, BlogCategory } from '$lib/types/blog'
import type { RunningPB } from '$lib/types/personalBests'
import type { RunningTraining } from '$lib/types/running'
import type { TrainingSummary, RandomPosts } from './types/types'
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
 * Creates a RandomPosts object by selecting one random post for each category from the provided posts.
 * @param posts The array of blog posts to select from.
 * @param categories The array of category strings to create random posts for.
 * @returns A RandomPosts object with one random post per category, or null if no posts exist for a category.
 */
export function createRandomPostsByLabels(
    posts: BlogPost[],
    labels: string[]
): RandomPosts {
    const result: RandomPosts = {}

    for (const label of labels) {
        // Filter posts that have this category in their labels
        const categoryPosts = posts.filter(post =>
            post.labels.some(l =>
                l.toLowerCase() === label.toLowerCase()
            )
        )

        // Select a random post from the filtered posts, or null if none exist
        if (categoryPosts.length > 0) {
            const randomPost = getRandomBlogPosts(categoryPosts, 1)[0]
            result[label] = randomPost
        } else {
            result[label] = null
        }
    }

    return result
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

// --- Helper Functions ---

/**
 * Calculates the current week number of the year.
 * @param date - The date to check.
 * @returns The week number (1-53).
 */
const getWeekOfYear = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const diff = date.getTime() - startOfYear.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)
    return Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7)
}

/**
 * Calculates the total distance for a list of trainings.
 * @param trainings - An array of running activities.
 * @returns The sum of all distances.
 */
const calculateTotalDistance = (trainings: RunningTraining[]): number => {
    return trainings.reduce((acc, training) => acc + training.distance, 0)
}

/**
 * Calculates the total moving time for a list of trainings.
 * @param trainings - An array of running activities.
 * @returns The sum of all moving times in minutes.
 */
const calculateTotalTime = (trainings: RunningTraining[]): number => {
    return trainings.reduce((acc, training) => acc + training.moving_time, 0)
}

// --- Main Transformation Function ---

/**
 * Transforms an array of running activities into a structured summary based on a specific timeframe.
 * @param trainings - The complete list of running activities.
 * @param timeframe - The selected timeframe ('30', '180', '365', '730', 'all').
 * @param currentDate - The current date, for accurate calculations.
 * @returns A TrainingSummary object.
 */
export const calculateTrainingSummary = (
    trainings: RunningTraining[],
    timeframe: string = '30',
    currentDate: Date = new Date()
): TrainingSummary => {
    // Filter trainings based on selected timeframe
    let filteredTrainings: RunningTraining[]
    let priorTrainings: RunningTraining[]

    if (timeframe === 'all') {
        filteredTrainings = trainings
        priorTrainings = [] // No prior period for "all time"
    } else {
        const daysAgo = parseInt(timeframe)
        const cutoffDate = new Date(currentDate)
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

        // Current period trainings
        filteredTrainings = trainings.filter((t) => t.date >= cutoffDate)

        // Prior period trainings (same duration, immediately before)
        const priorCutoffDate = new Date(cutoffDate)
        priorCutoffDate.setDate(priorCutoffDate.getDate() - daysAgo)
        priorTrainings = trainings.filter(
            (t) => t.date >= priorCutoffDate && t.date < cutoffDate
        )
    }

    // Calculate current period metrics
    const totalDistance = calculateTotalDistance(filteredTrainings)
    const totalTimeMinutes = calculateTotalTime(filteredTrainings)
    const totalTimeHours = totalTimeMinutes / 60

    // Calculate weekly average for current period
    const daysInPeriod = timeframe === 'all' ? 365 : parseInt(timeframe)
    const weeksInPeriod = daysInPeriod / 7
    const weeklyAverage = weeksInPeriod > 0 ? totalDistance / weeksInPeriod : 0

    // Calculate prior period metrics for comparison
    let prevWeeklyAverage = 0
    if (priorTrainings.length > 0) {
        const prevTotalDistance = calculateTotalDistance(priorTrainings)
        const prevWeeksInPeriod = daysInPeriod / 7
        prevWeeklyAverage =
            prevWeeksInPeriod > 0 ? prevTotalDistance / prevWeeksInPeriod : 0
    }

    return {
        trainings: filteredTrainings,
        weeklyAverage: parseFloat(weeklyAverage.toFixed(2)),
        prevWeeklyAverage: parseFloat(prevWeeklyAverage.toFixed(2)),
        totalTime: parseFloat(totalTimeHours.toFixed(2)),
        totalDistance: parseFloat(totalDistance.toFixed(2)),
    }
}
