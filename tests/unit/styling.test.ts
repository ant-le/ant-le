import { describe, it, expect, beforeAll } from 'vitest'
import * as fs from 'fs/promises'
import * as path from 'path'
import { glob } from 'glob'

// --- Centralized Test Configuration ---
const UNAUTHORIZED_COLOR_PATTERN =
    /(bg-|text-|border-)(gray|red|blue|green|yellow|purple|pink|indigo|teal|orange|amber|lime|emerald|cyan|sky|violet|fuchsia|rose|slate|zinc|stone)-\d+/g

const THEME_CONFIG = {
    default: 'minimal',
    secondary: 'artistic',
}

// --- Test Setup ---
const svelteFilesPattern = path.join(process.cwd(), 'src/**/*.svelte')
const layoutFile = path.join(process.cwd(), 'src/routes/+layout.svelte')

const allSvelteFiles = await glob(svelteFilesPattern, {
    ignore: layoutFile,
})

// --- Test Suite ---
describe('Styling Compliance', () => {
    // A test suite for all Svelte files, run for each file individually.
    describe.each(allSvelteFiles)('Component & Page File: %s', (file) => {
        let content: string = ''

        beforeAll(async () => {
            content = await fs.readFile(file, 'utf-8')
        })

        it('should use "artistic:" prefix for theme overrides, not "dark:"', () => {
            expect(content).not.toContain('dark:')

            if (content.includes(`[data-theme="${THEME_CONFIG.secondary}"]`)) {
                expect(content).toContain(`${THEME_CONFIG.secondary}:`)
            }
        })

        it('should not use unauthorized hardcoded Tailwind colors', () => {
            const matches = content.match(UNAUTHORIZED_COLOR_PATTERN)

            expect(
                matches,
                `Found unauthorized colors in ${file}: ${matches?.join(', ')}`
            ).toBeNull()
        })
    })
})
