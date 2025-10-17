import type { NavItem } from '$lib/types/types'

export type CVLanguage = 'en' | 'de'

export interface CVSkillGroup {
    title: string
    items: string[]
}

export interface CVPeriod {
    from: string
    to: string
}

export interface CVExperienceEntry {
    period: CVPeriod
    role: string
    organisation: string
    location: string
    achievements: string[]
    tools: string[]
}

export interface CVEducationEntry {
    period: CVPeriod
    degree: string
    institution: string
    location: string
    focus: string[]
    details?: string[]
}

export interface CVAdditionalEntry {
    period: CVPeriod
    role: string
    organisation: string
    location: string
    details: string[]
}

export interface CVLanguageProficiency {
    name: string
    level: string
}

export interface CVInterestGroup {
    title: string
    items: string[]
}

export interface CVContent {
    language: CVLanguage
    label: string
    tagline: string
    download: {
        href: string
        label: string
    }
    sections: {
        introduction: string
        skillGroups: CVSkillGroup[]
        languages: CVLanguageProficiency[]
        experience: CVExperienceEntry[]
        education: CVEducationEntry[]
        involvement: CVAdditionalEntry[]
        interests?: CVInterestGroup[]
    }
}

export const CV_LANGUAGES: CVLanguage[] = ['en', 'de']

export const DEFAULT_CV_LANGUAGE: CVLanguage = 'en'

export const CV_LIST_BULLET = '▹'
export const CV_SEPARATOR = '·'

const DEGREE_KEYWORDS = ['msc', 'mba', 'ma', 'bsc', 'ba', 'phd']

function uniqueBy<T>(values: T[], key: (value: T) => string) {
    const seen = new Set<string>()
    const result: T[] = []

    for (const value of values) {
        const dedupeKey = key(value)
        if (seen.has(dedupeKey)) {
            continue
        }
        seen.add(dedupeKey)
        result.push(value)
    }

    return result
}

export interface EducationSummary {
    degree: string
    institution: string
}

export function summarizeEducation(
    entries: CVEducationEntry[],
    limit = 2
): EducationSummary[] {
    if (!entries.length) {
        return []
    }

    const prioritized = entries.filter((entry) =>
        DEGREE_KEYWORDS.some((keyword) =>
            entry.degree.toLowerCase().includes(keyword)
        )
    )

    const ordered = uniqueBy([...prioritized, ...entries], (entry) =>
        [entry.degree, entry.institution].join('::')
    )

    return ordered.slice(0, limit).map((entry) => ({
        degree: entry.degree,
        institution: entry.institution,
    }))
}

export function summarizeInvolvement(
    entries: CVAdditionalEntry[],
    limit = 2
): string {
    if (!entries.length) {
        return ''
    }

    const selections = entries.slice(0, limit).map(
        (entry) => `${entry.role} (${entry.organisation})`
    )

    return selections.join(` ${CV_SEPARATOR} `)
}

export function summarizeProjects(
    projects: { title: string }[],
    limit = 3
): string {
    if (!projects.length) {
        return ''
    }

    const highlights = projects
        .slice(0, limit)
        .map((project) => project.title)
        .join(', ')

    return `Highlights: ${highlights}`
}

const cvData: Record<CVLanguage, CVContent> = {
    en: {
        language: 'en',
        label: 'English',
        tagline:
            'Data scientist bridging political science and software engineering to ship reliable analytical products.',
        download: {
            href: '/cv/anton-lechuga-cv-en.pdf',
            label: 'Download CV (PDF)',
        },
        sections: {
            introduction:
                'MSc Data Science candidate at TU Wien with professional experience across analytics consulting, academic research, and web development.',
            skillGroups: [
                {
                    title: 'Programming',
                    items: ['Python', 'TypeScript', 'Svelte', 'Go', 'SQL', 'R'],
                },
                {
                    title: 'ML & Stats',
                    items: ['Causal inference', 'Bayesian modelling (Stan)', 'Forecasting', 'Experimental design'],
                },
                {
                    title: 'DevOps',
                    items: ['PostgreSQL', 'Docker', 'Git', 'Linux'],
                },
            ],
            languages: [
                { name: 'German', level: 'Native' },
                { name: 'English', level: 'C1' },
                { name: 'Italian', level: 'C1' },
                { name: 'Spanish', level: 'B2' },
                { name: 'French', level: 'B1' },
                { name: 'Latin', level: 'Latinum' },
            ],
            experience: [
                {
                    period: { from: 'Mar 2024', to: 'Present' },
                    role: 'Consultant · Data Science & Analytics',
                    organisation: 'Vienesse Consulting',
                    location: 'Vienna, AT',
                    achievements: [
                        'Designed ideation workshops around strategic data products.',
                        'Drafted a shortlisted funding proposal for IT modernisation projects.',
                        'Optimised and extended production SQL scripts.',
                        'Built an automated questionnaire workflow using Go, Svelte, and PostgreSQL.',
                    ],
                    tools: ['Go', 'Svelte', 'PostgreSQL', 'SQL'],
                },
                {
                    period: { from: 'Mar 2023', to: 'May 2024' },
                    role: 'Web Developer',
                    organisation: 'TU Wien',
                    location: 'Vienna, AT',
                    achievements: [
                        'Provided technical assistance to the actuarial science department.',
                        'Implemented an automated job portal in PHP for faculty operations.',
                    ],
                    tools: ['PHP', 'MySQL', 'Git'],
                },
                {
                    period: { from: 'Sep 2019', to: 'May 2022' },
                    role: 'Student Assistant · Empirical Methods',
                    organisation: 'University of Konstanz',
                    location: 'Konstanz, DE',
                    achievements: [
                        'Led tutorial sessions for the "Empirical Research Methods" lecture (Prof. Dr. Susumu Shikano).',
                        'Prepared assignments and solutions illustrating regression, hypothesis testing, and reproducible workflows.',
                        'Delivered exercises and office hours on quantitative research design.',
                        'Tutored students on statistical software and data interpretation in R.',
                    ],
                    tools: ['R', 'RStudio', 'LaTeX', 'SPSS', 'Git'],
                },
                {
                    period: { from: 'Apr 2021', to: 'Oct 2021' },
                    role: 'Data Analyst Intern',
                    organisation: 'GiM Berlin',
                    location: 'Berlin, DE',
                    achievements: [
                        'Cleaned and merged survey datasets using SQL ahead of client reporting.',
                        'Ran exploratory and inferential analyses in Python and R to inform business recommendations.',
                    ],
                    tools: ['Python', 'Pandas', 'SQL'],
                },
                {
                    period: { from: 'Apr 2020', to: 'Sep 2020' },
                    role: 'Research Assistant · Politics of Inequality',
                    organisation: 'University of Konstanz',
                    location: 'Konstanz, DE',
                    achievements: [
                        'Supported operations for the cluster Managerial Office and MethodsHub.',
                        'Documented research processes and data collection for interdisciplinary project teams.',
                    ],
                    tools: ['Confluence', 'Excel', 'Qualtrics'],
                },
            ],
            education: [
                {
                    period: { from: 'Oct 2022', to: 'Present' },
                    degree: 'MSc Data Science',
                    institution: 'Technische Universität Wien',
                    location: 'Vienna, AT',
                    focus: ['Machine Learning', 'Causal Inference', 'Data Engineering'],
                    details: [
                        'Graduate coursework in advanced machine learning, predictive modelling, and data infrastructure.',
                        'Research projects on causal inference for socio-technical systems.',
                    ],
                },
                {
                    period: { from: 'Jul 2023', to: 'Jul 2023' },
                    degree: 'Summer School · Computational Social Science',
                    institution: 'GESIS – Leibniz Institute for the Social Sciences',
                    location: 'Cologne, DE',
                    focus: ['Network Analysis', 'Text as Data', 'Agent-Based Modelling'],
                    details: ['Intensive programme on modern computational methods for social research.'],
                },
                {
                    period: { from: 'Aug 2018', to: 'Jun 2022' },
                    degree: 'BA Politics and Public Administration',
                    institution: 'University of Konstanz',
                    location: 'Konstanz, DE',
                    focus: ['Quantitative Methods', 'Comparative Politics', 'Econometrics'],
                    details: [
                        'Teaching assistance for quantitative research courses.',
                        'Bachelor thesis on political behaviour using statistical modelling.',
                    ],
                },
                {
                    period: { from: 'Aug 2020', to: 'Jan 2021' },
                    degree: 'Erasmus Exchange · Social Sciences',
                    institution: 'Uppsala University',
                    location: 'Uppsala, SE',
                    focus: ['International Relations', 'Political Theory'],
                    details: [
                        'Focused on comparative political institutions and Nordic policy frameworks.',
                    ],
                },
                {
                    period: { from: 'Oct 2017', to: 'Jul 2018' },
                    degree: 'Linguistics & Philosophy Coursework',
                    institution: 'University of Konstanz',
                    location: 'Konstanz, DE',
                    focus: ['Formal Semantics', 'Logic', 'Epistemology'],
                    details: ['Elective studies exploring linguistics and philosophy foundations.'],
                },
            ],
            involvement: [
                {
                    period: { from: 'Nov 2022', to: 'Present' },
                    role: 'Volunteer',
                    organisation: 'Inner Vision e.V.',
                    location: 'Vienna, AT',
                    details: [
                        'Support research synthesis for development cooperation initiatives.',
                        'Coordinate grant submissions with partner organisations.',
                    ],
                },
                {
                    period: { from: 'Aug 2017', to: 'Mar 2020' },
                    role: 'Organisational & Marketing Lead',
                    organisation: 'Universitätstheater Konstanz',
                    location: 'Konstanz, DE',
                    details: [
                        'Supervised production planning, budgeting, and promotional campaigns for student theatre.',
                        'Directed volunteer teams and contributed as on-stage talent.',
                    ],
                },
                {
                    period: { from: 'Jun 2017', to: 'Sep 2017' },
                    role: 'Head of Sports Animator',
                    organisation: 'P.S. L’Equipe',
                    location: 'Venice, IT',
                    details: [
                        'Led daily sports programming for international hotel guests in a multilingual setting.',
                        'Managed seasonal staff to deliver consistent guest experiences.',
                    ],
                },
            ],
            interests: [
                {
                    title: 'Personal Interests',
                    items: [
                        'Long-distance running and trail training',
                        'DJing and curating electronic music sets',
                        'Exploring causal inference literature and workshops',
                    ],
                },
            ],
        },
    },
    de: {
        language: 'de',
        label: 'Deutsch',
        tagline:
            'Data-Science-Student an der TU Wien mit sozialwissenschaftlichem Hintergrund und praktischer Analyseerfahrung.',
        download: {
            href: '/cv/anton-lechuga-cv-de.pdf',
            label: 'Lebenslauf herunterladen (PDF)',
        },
        sections: {
            introduction:
                'MSc-Studierender Data Science an der TU Wien mit Beratungserfahrung in Analytics, akademischer Forschungspraxis und Webentwicklung.',
            skillGroups: [
                {
                    title: 'Programmierung',
                    items: ['Python', 'TypeScript', 'Svelte', 'Go', 'SQL', 'R', 'C++ (basics)','Lua (basics)', 'Java', 'PHP'],
                },
                {
                    title: 'ML & Statistik',
                    items: ['Pytorch', 'Jax', 'Probibalistic Modelling', 'Python (Numpy, Pandas, Matplotlib, Sk-Learn)'],
                },
                {
                    title: 'DevOps',
                    items: ['PostgreSQL', 'Docker', 'Git', 'Linux'],
                },
            ],
            languages: [
                { name: 'Deutsch', level: 'Muttersprache' },
                { name: 'Englisch', level: 'C1' },
                { name: 'Italienisch', level: 'C1' },
                { name: 'Spanisch', level: 'B2' },
                { name: 'Französisch', level: 'B1' },
                { name: 'Latein', level: 'Latinum' },
            ],
            experience: [
                {
                    period: { from: 'Mär 2024', to: 'Heute' },
                    role: 'Associate Consultant · Data Science & Analytics',
                    organisation: 'Vienesse Consulting',
                    location: 'Wien, Österreich',
                    achievements: [
                        'Konzeption und Moderation von Ideation-Workshops zu datengetriebenen Services.',
                        'Ausarbeitung eines Förderungsantrags für IT-Projekte (Shortlist).',
                        'Optimierung und Erweiterung produktiver SQL-Skripte.',
                        'Full-Stack-Entwicklung eines automatisierten Fragebogens mit Go, Svelte und PostgreSQL.',
                    ],
                    tools: ['Go', 'Svelte', 'PostgreSQL', 'SQL'],
                },
                {
                    period: { from: 'Mär 2023', to: 'Mai 2024' },
                    role: 'Webentwickler',
                    organisation: 'TU Wien',
                    location: 'Wien, Österreich',
                    achievements: [
                        'Assistenz und technischer Support für den Fachbereich Versicherungsmathematik.',
                        'Entwicklung eines automatisierten Jobportals in PHP.',
                    ],
                    tools: ['PHP', 'MySQL', 'Git'],
                },
                {
                    period: { from: 'Sep 2019', to: 'Mai 2022' },
                    role: 'Wissenschaftliche Hilfskraft · Empirical Research Methods',
                    organisation: 'Universität Konstanz',
                    location: 'Konstanz, Deutschland',
                    achievements: [
                        'Leitung von Tutorien zur Vorlesung "Empirical Research Methods" (Prof. Dr. Susumu Shikano).',
                        'Erstellung von Übungsaufgaben und Lösungen zu Regression, Hypothesentests und Reproduzierbarkeit.',
                        'Durchführung von Übungen und Sprechstunden zu quantitativer Forschungslogik.',
                        'Betreuung von Studierenden beim Einsatz statistischer Software und Dateninterpretation in R.',
                    ],
                    tools: ['R', 'RStudio', 'LaTeX', 'SPSS', 'Git'],
                },
                {
                    period: { from: 'Apr 2021', to: 'Okt 2021' },
                    role: 'Data-Analyst (Praktikum)',
                    organisation: 'GiM Berlin',
                    location: 'Berlin, Deutschland',
                    achievements: [
                        'Bereinigung und Verknüpfung von Befragungsdatensätzen mit SQL zur Vorbereitung von Kundenreports.',
                        'Explorative und inferenzstatistische Analysen in Python und R zur Ableitung von Handlungsempfehlungen.',
                    ],
                    tools: ['Python', 'Pandas', 'SQL'],
                },
                {
                    period: { from: 'Apr 2020', to: 'Sep 2020' },
                    role: 'Wissenschaftliche Hilfskraft · The Politics of Inequality',
                    organisation: 'Universität Konstanz',
                    location: 'Konstanz, Deutschland',
                    achievements: [
                        'Unterstützung des Managerial Office und des MethodsHub bei organisatorischen Abläufen.',
                        'Dokumentation von Forschungsprozessen und Datenerhebungen für interdisziplinäre Teams.',
                    ],
                    tools: ['Confluence', 'Excel', 'Qualtrics'],
                },
            ],
            education: [
                {
                    period: { from: 'Okt 2022', to: 'Heute' },
                    degree: 'MSc Data Science',
                    institution: 'Technische Universität Wien',
                    location: 'Wien, Österreich',
                    focus: ['Machine Learning', 'Kausalinferenz', 'Data Engineering'],
                    details: [
                        'Vertiefung in maschinellem Lernen, Datenengineering und statistischer Modellierung.',
                        'Forschungsarbeiten zu kausaler Analyse in sozio-technischen Systemen.',
                    ],
                },
                {
                    period: { from: 'Jul 2023', to: 'Jul 2023' },
                    degree: 'Summer School · Computational Social Science',
                    institution: 'GESIS – Leibniz-Institut für Sozialwissenschaften',
                    location: 'Köln, Deutschland',
                    focus: ['Netzwerkanalyse', 'Text as Data', 'Agentenbasierte Modellierung'],
                    details: ['Intensivprogramm zu modernen rechnergestützten Methoden der Sozialforschung.'],
                },
                {
                    period: { from: 'Aug 2018', to: 'Jun 2022' },
                    degree: 'BA Politik- und Verwaltungswissenschaft',
                    institution: 'Universität Konstanz',
                    location: 'Konstanz, Deutschland',
                    focus: ['Quantitative Methoden', 'Vergleichende Politikwissenschaft', 'Ökonometrie'],
                    details: [
                        'Mitwirkung an Tutorien und Statistik-Workshops für Studierende.',
                        'Abschlussarbeit zu politischem Verhalten mit quantitativen Methoden.',
                    ],
                },
                {
                    period: { from: 'Aug 2020', to: 'Jan 2021' },
                    degree: 'Erasmus · Sozialwissenschaften',
                    institution: 'Uppsala University',
                    location: 'Uppsala, Schweden',
                    focus: ['Internationale Beziehungen', 'Politische Theorie'],
                    details: [
                        'Schwerpunkt auf nordischen Institutionen und globaler Politikgestaltung.',
                    ],
                },
                {
                    period: { from: 'Okt 2017', to: 'Jul 2018' },
                    degree: 'Studienleistungen Linguistik & Philosophie',
                    institution: 'Universität Konstanz',
                    location: 'Konstanz, Deutschland',
                    focus: ['Formale Semantik', 'Logik', 'Erkenntnistheorie'],
                    details: ['Wahlfächer zur Vertiefung in Sprach- und Geisteswissenschaften.'],
                },
            ],
            involvement: [
                {
                    period: { from: 'Nov 2022', to: 'Heute' },
                    role: 'Ehrenamtliche Mitarbeit',
                    organisation: 'Inner Vision e.V.',
                    location: 'Wien, Österreich',
                    details: [
                        'Recherchen für Projekte der Entwicklungszusammenarbeit durchgeführt.',
                        'Förderanträge gemeinsam mit Partnerorganisationen vorbereitet.',
                    ],
                },
                {
                    period: { from: 'Aug 2017', to: 'Mär 2020' },
                    role: 'Organisation & Marketing Leitung',
                    organisation: 'Universitätstheater Konstanz',
                    location: 'Konstanz, Deutschland',
                    details: [
                        'Verantwortlich für Spielplan, Budget und Marketing studentischer Produktionen.',
                        'Ehrenamtliche Teams koordiniert und selbst auf der Bühne mitgewirkt.',
                    ],
                },
                {
                    period: { from: 'Jun 2017', to: 'Sep 2017' },
                    role: 'Head of Sports · Animateur',
                    organisation: 'P.S. L’Equipe',
                    location: 'Venedig, Italien',
                    details: [
                        'Tägliche Sportprogramme für internationale Hotelgäste entwickelt und moderiert.',
                        'Mehrsprachiges Animationsteam durch die Sommersaison geführt.',
                    ],
                },
            ],
            interests: [
                {
                    title: 'Persönliche Interessen',
                    items: [
                        'Langstreckenlauf und Trail-Training',
                        'DJing und elektronische Musiksets',
                        'Fachliteratur zu Kausalanalyse und Statistik',
                    ],
                },
            ],
        },
    },
}

export const cvContentByLanguage: Record<CVLanguage, CVContent> = cvData

export const cvLanguageOptions: NavItem[] = CV_LANGUAGES.map((language) => ({
    value: language,
    label: cvData[language].label,
}))
