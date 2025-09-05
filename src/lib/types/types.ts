import { type RunningTraining } from './running'
import { type BlogPost } from '$lib/types/blog'

export type Theme = 'minimal' | 'artistic'

export interface TrainingSummary {
    trainings: RunningTraining[]
    weeklyAverage: number
    prevWeeklyAverage: number
    totalTime: number
    totalDistance: number
}

export interface NavItem {
    value: string
    label: string
}

export type RandomCategories = 'social science' | 'math' | 'philosophy'
export type RandomPosts = Record<RandomCategories, BlogPost | null>
