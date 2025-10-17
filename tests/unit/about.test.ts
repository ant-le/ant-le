import { describe, it, expect } from 'vitest'
import {
    CV_LANGUAGES,
    DEFAULT_CV_LANGUAGE,
    cvContentByLanguage,
    summarizeEducation,
    summarizeInvolvement,
    summarizeProjects,
} from '$lib/types/about'
import { projectPosts } from '$lib/types/projects'

describe('About page data contracts', () => {
    it('provides CV content for English and German with downloads', () => {
        expect(CV_LANGUAGES).toEqual(['en', 'de'])
        expect(DEFAULT_CV_LANGUAGE).toBe('en')

        CV_LANGUAGES.forEach((lang) => {
            const cv = cvContentByLanguage[lang]
            expect(cv).toBeDefined()

            expect(cv.language).toBe(lang)
            expect(cv.download.href).toMatch(/^\/cv\/.+\.pdf$/)
            expect(cv.download.label.trim().length).toBeGreaterThan(0)

            expect(cv.sections.introduction.trim().length).toBeGreaterThan(0)
            expect(Array.isArray(cv.sections.skillGroups)).toBe(true)
            expect(cv.sections.skillGroups.length).toBeGreaterThanOrEqual(3)
            cv.sections.skillGroups.forEach((group) => {
                expect(group.title.trim().length).toBeGreaterThan(0)
                expect(group.items.length).toBeGreaterThan(0)
            })

            expect(cv.sections.languages.length).toBeGreaterThan(0)
            cv.sections.languages.forEach((language) => {
                expect(language.name.trim().length).toBeGreaterThan(0)
                expect(language.level.trim().length).toBeGreaterThan(0)
            })

            expect(cv.sections.experience.length).toBeGreaterThan(0)
            expect(cv.sections.education.length).toBeGreaterThan(0)
            expect(cv.sections.involvement.length).toBeGreaterThan(0)

            cv.sections.experience.forEach((experience) => {
                expect(experience.period.from.trim().length).toBeGreaterThan(0)
                expect(experience.period.to.trim().length).toBeGreaterThan(0)
                expect(experience.tools.length).toBeGreaterThan(0)
                expect(experience.achievements.length).toBeGreaterThan(0)
            })

            cv.sections.education.forEach((education) => {
                expect(education.focus.length).toBeGreaterThan(0)
                expect(education.period.from.trim().length).toBeGreaterThan(0)
                expect(education.period.to.trim().length).toBeGreaterThan(0)
                if (education.details) {
                    expect(education.details.length).toBeGreaterThan(0)
                }
            })

            cv.sections.involvement.forEach((item) => {
                expect(item.period.from.trim().length).toBeGreaterThan(0)
                expect(item.period.to.trim().length).toBeGreaterThan(0)
                expect(item.details.length).toBeGreaterThan(0)
            })

            if (cv.sections.interests) {
                cv.sections.interests.forEach((interestGroup) => {
                    expect(interestGroup.title.trim().length).toBeGreaterThan(0)
                    expect(interestGroup.items.length).toBeGreaterThan(0)
                })
            }
        })
    })

    it('exposes at least one project with complete metadata', () => {
        expect(Array.isArray(projectPosts)).toBe(true)
        expect(projectPosts.length).toBeGreaterThan(0)

        projectPosts.forEach((project) => {
            expect(project.title.trim().length).toBeGreaterThan(0)
            expect(project.desc.trim().length).toBeGreaterThan(0)
            expect(project.post.trim().length).toBeGreaterThan(0)
            expect(project.labels.length).toBeGreaterThan(0)
        })
    })

    describe('collapsed section summaries', () => {
        it('summarizes formal education with highlighted degrees', () => {
            const summaryEn = summarizeEducation(
                cvContentByLanguage.en.sections.education
            )
            const summaryDe = summarizeEducation(
                cvContentByLanguage.de.sections.education
            )

            expect(summaryEn).toEqual([
                {
                    degree: 'MSc Data Science',
                    institution: 'Technische Universität Wien',
                },
                {
                    degree: 'BA Politics and Public Administration',
                    institution: 'University of Konstanz',
                },
            ])

            expect(summaryDe).toEqual([
                {
                    degree: 'MSc Data Science',
                    institution: 'Technische Universität Wien',
                },
                {
                    degree: 'BA Politik- und Verwaltungswissenschaft',
                    institution: 'Universität Konstanz',
                },
            ])
        })

        it('summarizes additional involvement with primary roles', () => {
            const summaryEn = summarizeInvolvement(
                cvContentByLanguage.en.sections.involvement
            )
            const summaryDe = summarizeInvolvement(
                cvContentByLanguage.de.sections.involvement
            )

            expect(summaryEn).toContain('Inner Vision e.V.')
            expect(summaryEn).toContain('Universitätstheater Konstanz')

            expect(summaryDe).toContain('Inner Vision e.V.')
            expect(summaryDe).toContain('Universitätstheater Konstanz')
        })

        it('summarizes featured projects with a highlight string', () => {
            const summary = summarizeProjects(projectPosts)

            expect(summary.startsWith('Highlights:')).toBe(true)
            expect(summary).toContain('Music Generation with VQ-VAE')
        })
    })
})
