import { expect, test } from '@playwright/test'

test('navigates between pages and switches the document language', async ({
    page,
}) => {
    await page.goto('/')

    await expect(page).toHaveTitle('Anton Lechuga')
    await page.getByRole('link', { name: 'BLOG' }).click()
    await expect(page).toHaveURL(/\/blog$/)
    await expect(
        page.getByRole('heading', { name: 'Blog', level: 1 })
    ).toBeVisible()

    await page.getByRole('link', { name: 'DE' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    await expect(page.getByRole('link', { name: 'EN' })).toBeVisible()
})

test('opens and closes the blog post as an accessible dialog', async ({
    page,
}) => {
    await page.goto('/blog')
    await page.getByRole('button', { name: 'Read more' }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText('Why I Am Starting a Blog')
    await expect(dialog).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page.getByRole('button', { name: 'Read more' })).toBeFocused()
})

test('keeps the homepage and blog within a mobile viewport', async ({
    page,
}) => {
    for (const width of [320, 390]) {
        await page.setViewportSize({ width, height: 844 })

        for (const path of ['/', '/blog']) {
            await page.goto(path)
            const dimensions = await page.evaluate(() => ({
                documentWidth: document.documentElement.scrollWidth,
                viewportWidth: window.innerWidth,
            }))

            expect(dimensions.documentWidth).toBeLessThanOrEqual(
                dimensions.viewportWidth
            )
        }
    }
})

test('keeps primary content visible without JavaScript', async ({
    browser,
}) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()

    await page.goto('/')
    await expect(
        page.getByRole('heading', { name: 'About Me', level: 2 })
    ).toBeVisible()
    await expect(
        page.getByRole('heading', { name: 'Running', level: 2 })
    ).toBeVisible()

    await context.close()
})
