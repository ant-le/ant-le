import { test, expect } from '@playwright/test';

test.describe('Component Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page before each test
		await page.goto('/');
	});

	test.describe('TextCard Component', () => {
		test('should display text with proper styling', async ({ page }) => {
			// This test assumes TextCard is used on the home page
			await expect(page.locator('p.text-gray-800')).toBeVisible();
		});

		test('should apply center alignment when specified', async ({ page }) => {
			// Test center-aligned text cards
			const centerAlignedCard = page.locator('div[style*="text-align: center"]');
			await expect(centerAlignedCard).toBeVisible();
		});
	});

	test.describe('BlogCard Component', () => {
		test('should display blog post information', async ({ page }) => {
			// Navigate to science page where blog cards should be visible
			await page.goto('/science');
			
			// Check for blog card elements
			await expect(page.locator('.bg-white.rounded-lg.shadow-md')).toBeVisible();
			await expect(page.locator('h3.text-xl.font-semibold')).toBeVisible();
		});

		test('should have clickable read more links', async ({ page }) => {
			await page.goto('/science');
			
			const readMoreButton = page.locator('a:has-text("Read More")').first();
			await expect(readMoreButton).toBeVisible();
			await expect(readMoreButton).toHaveAttribute('href');
		});

		test('should display categories and labels', async ({ page }) => {
			await page.goto('/science');
			
			// Check for category badges
			await expect(page.locator('.bg-blue-100.text-blue-800')).toBeVisible();
			
			// Check for label badges
			await expect(page.locator('.bg-gray-100.text-gray-600')).toBeVisible();
		});
	});

	test.describe('FriendsReferences Component', () => {
		test('should display friend testimonials', async ({ page }) => {
			// Friends references should be on the home page
			await page.goto('/');
			
			// Check for friend reference cards
			await expect(page.locator('.bg-white.rounded-lg.shadow-md')).toBeVisible();
			await expect(page.locator('blockquote')).toBeVisible();
		});

		test('should display friend images and names', async ({ page }) => {
			await page.goto('/');
			
			// Check for friend images
			await expect(page.locator('img.w-16.h-16.rounded-full')).toBeVisible();
			
			// Check for friend names
			await expect(page.locator('h3.text-lg.font-semibold')).toBeVisible();
		});
	});

	test.describe('CardRasterHorizontal Component', () => {
		test('should display horizontal card layout', async ({ page }) => {
			await page.goto('/');
			
			// Check for horizontal scroll container
			await expect(page.locator('.flex.gap-6.overflow-x-auto')).toBeVisible();
		});

		test('should show navigation buttons when needed', async ({ page }) => {
			await page.goto('/');
			
			// Check for navigation buttons (may or may not be visible depending on screen size)
			const navButtons = page.locator('button[aria-label*="Scroll"]');
			await expect(navButtons).toHaveCount(0); // Initially no buttons if all cards fit
		});

		test('should have responsive behavior', async ({ page }) => {
			// Test on mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');
			
			// Check that the layout adapts to mobile
			await expect(page.locator('.flex.gap-6.overflow-x-auto')).toBeVisible();
		});
	});

	test.describe('CardGridFull Component', () => {
		test('should display grid layout', async ({ page }) => {
			await page.goto('/science');
			
			// Check for grid container
			await expect(page.locator('.grid.gap-6')).toBeVisible();
		});

		test('should show filters for blog posts', async ({ page }) => {
			await page.goto('/science');
			
			// Check for filter controls
			await expect(page.locator('input[placeholder="Search posts..."]')).toBeVisible();
			await expect(page.locator('select')).toBeVisible();
		});

		test('should filter posts by search term', async ({ page }) => {
			await page.goto('/science');
			
			const searchInput = page.locator('input[placeholder="Search posts..."]');
			await searchInput.fill('Quantum');
			
			// Wait for filtering to take effect
			await page.waitForTimeout(100);
			
			// Check that filtered results are shown
			await expect(page.locator('text=Showing')).toBeVisible();
		});

		test('should filter posts by label', async ({ page }) => {
			await page.goto('/science');
			
			const labelSelect = page.locator('select').first();
			await labelSelect.selectOption({ label: 'quantum' });
			
			// Wait for filtering to take effect
			await page.waitForTimeout(100);
			
			// Check that filtered results are shown
			await expect(page.locator('text=Showing')).toBeVisible();
		});

		test('should show clear filters button when filters are applied', async ({ page }) => {
			await page.goto('/science');
			
			const searchInput = page.locator('input[placeholder="Search posts..."]');
			await searchInput.fill('Test');
			
			// Check for clear filters button
			await expect(page.locator('text=Clear all filters')).toBeVisible();
		});
	});

	test.describe('Responsive Design', () => {
		test('should work on mobile devices', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');
			
			// Check that the page loads and is usable on mobile
			await expect(page.locator('body')).toBeVisible();
		});

		test('should work on tablet devices', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 });
			await page.goto('/');
			
			// Check that the page loads and is usable on tablet
			await expect(page.locator('body')).toBeVisible();
		});

		test('should work on desktop devices', async ({ page }) => {
			await page.setViewportSize({ width: 1920, height: 1080 });
			await page.goto('/');
			
			// Check that the page loads and is usable on desktop
			await expect(page.locator('body')).toBeVisible();
		});
	});

	test.describe('Navigation', () => {
		test('should navigate between pages', async ({ page }) => {
			// Test navigation to science page
			await page.goto('/science');
			await expect(page.locator('body')).toBeVisible();
			
			// Test navigation to running page
			await page.goto('/running');
			await expect(page.locator('body')).toBeVisible();
			
			// Test navigation to music page
			await page.goto('/music');
			await expect(page.locator('body')).toBeVisible();
		});
	});

	test.describe('Accessibility', () => {
		test('should have proper ARIA labels', async ({ page }) => {
			await page.goto('/');
			
			// Check for proper ARIA labels on interactive elements
			const buttons = page.locator('button[aria-label]');
			await expect(buttons).toBeVisible();
		});

		test('should have proper heading structure', async ({ page }) => {
			await page.goto('/');
			
			// Check for proper heading hierarchy
			await expect(page.locator('h1, h2, h3')).toBeVisible();
		});

		test('should have proper alt text for images', async ({ page }) => {
			await page.goto('/');
			
			// Check that images have alt text
			const images = page.locator('img[alt]');
			await expect(images).toBeVisible();
		});
	});
});
