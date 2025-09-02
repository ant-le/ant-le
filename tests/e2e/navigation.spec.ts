import { test, expect } from '@playwright/test'

test.describe('Generic Header Link Validation', () => {
    test('all unique links in the header should be reachable', async ({
        page,
    }) => {
        await page.goto('/')
        const header = page.locator('header')
        await expect(header).toBeVisible()

        // find all anchor tags within the header.
        const allLinks = await header.locator('a').all()
        const uniqueInternalHrefs = new Set<string>()

        for (const link of allLinks) {
            const href = await link.getAttribute('href')

            // Ensure href is not null or empty.
            // Ensure it's an internal link (starts with '/').
            // Ignore simple anchor links ('#').
            if (href && href.startsWith('/') && href.length > 1) {
                uniqueInternalHrefs.add(href)
            }
        }

        // Ensure that we actually found some links to test.
        expect(uniqueInternalHrefs.size).toBeGreaterThan(0)

        for (const href of uniqueInternalHrefs) {
            const response = await page.request.get(href)
            await expect(
                response,
                `Link to "${href}" should be reachable`
            ).toBeOK()
        }
    })
})
