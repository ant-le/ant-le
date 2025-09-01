import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

describe('Styling Compliance', () => {
    const componentsDir = join(process.cwd(), 'src/lib/components')
    const pagesDir = join(process.cwd(), 'src/routes')
    const layoutFile = join(process.cwd(), 'src/routes/+layout.svelte')

    // Test that layout uses correct theme logic
    it('should use correct theme logic in layout', () => {
        const layoutContent = readFileSync(layoutFile, 'utf-8')

        // Should default to minimal theme
        expect(layoutContent).toContain(
            'let currentTheme: Theme = $state("minimal")'
        )

        // Should toggle between minimal and artistic
        expect(layoutContent).toContain(
            'currentTheme === "minimal" ? "artistic" : "minimal"'
        )

        // Should set data-theme attribute for artistic theme
        expect(layoutContent).toContain(
            "document.documentElement.setAttribute('data-theme', 'artistic')"
        )

        // Should remove attribute for minimal theme
        expect(layoutContent).toContain(
            "document.documentElement.removeAttribute('data-theme')"
        )
    })

    // Test that components use artistic: prefix instead of dark:
    it('should use artistic: prefix instead of dark: prefix', () => {
        const componentFiles = readdirSync(componentsDir)
            .filter((file: string) => file.endsWith('.svelte'))
            .map((file: string) => join(componentsDir, file))

        componentFiles.forEach((file: string) => {
            const content = readFileSync(file, 'utf-8')

            // Should not contain dark: prefix
            expect(content).not.toContain('dark:')

            // Should contain artistic: prefix for overrides
            if (content.includes('/* Minimal theme (default) */')) {
                expect(content).toContain('artistic:')
            }
        })
    })

    // Test that pages use artistic: prefix instead of dark:
    it('should use artistic: prefix in pages', () => {
        const pageFiles = readdirSync(pagesDir)
            .filter(
                (file: string) =>
                    file.endsWith('.svelte') && file !== '+layout.svelte'
            )
            .map((file: string) => join(pagesDir, file))

        pageFiles.forEach((file: string) => {
            const content = readFileSync(file, 'utf-8')

            // Should not contain dark: prefix
            expect(content).not.toContain('dark:')

            // Should contain artistic: prefix for overrides
            if (content.includes('/* Minimal theme (default) */')) {
                expect(content).toContain('artistic:')
            }
        })
    })

    // Test that minimal theme is the default
    it('should have minimal theme as default', () => {
        const componentFiles = readdirSync(componentsDir)
            .filter((file: string) => file.endsWith('.svelte'))
            .map((file: string) => join(componentsDir, file))

        componentFiles.forEach((file: string) => {
            const content = readFileSync(file, 'utf-8')

            // Components should either use the old comment format OR use CSS variables with theme-based styling
            const hasOldFormat =
                content.includes('/* Minimal theme (default) */') &&
                content.includes('/* Artistic theme overrides */')
            const hasNewFormat =
                content.includes('var(--color-') &&
                content.includes('[data-theme="minimal"]') &&
                content.includes('[data-theme="artistic"]')

            // Should use either the old format or the new format
            expect(hasOldFormat || hasNewFormat).toBe(true)
        })
    })

    // Test that no unauthorized hardcoded colors are used
    it('should not use unauthorized hardcoded colors', () => {
        const allFiles = [
            ...readdirSync(componentsDir)
                .filter((file: string) => file.endsWith('.svelte'))
                .map((file: string) => join(componentsDir, file)),
            ...readdirSync(pagesDir)
                .filter(
                    (file: string) =>
                        file.endsWith('.svelte') && file !== '+layout.svelte'
                )
                .map((file: string) => join(pagesDir, file)),
        ]

        // Colors that are NOT allowed (hardcoded Tailwind colors)
        const unauthorizedColorPattern =
            /(bg-|text-|border-)(gray|red|blue|green|yellow|purple|pink|indigo|teal|orange|amber|lime|emerald|cyan|sky|violet|fuchsia|rose|slate|zinc|stone)-\d+/g

        allFiles.forEach((file: string) => {
            const content = readFileSync(file, 'utf-8')
            const matches = content.match(unauthorizedColorPattern)

            if (matches) {
                console.log(`Unauthorized colors found in ${file}:`, matches)
            }

            // Should not contain unauthorized hardcoded Tailwind colors
            expect(matches).toBeNull()
        })
    })
})
