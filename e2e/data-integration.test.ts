import { test, expect } from '@playwright/test';

test.describe('Data Integration Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page before each test
		await page.goto('/');
	});

	test.describe('Blog Posts Data', () => {
		test('should display science blog posts', async ({ page }) => {
			await page.goto('/science');
			
			// Check that science posts are displayed
			await expect(page.locator('h3:has-text("Quantum")')).toBeVisible();
			await expect(page.locator('h3:has-text("Machine Learning")')).toBeVisible();
			await expect(page.locator('h3:has-text("Neural Networks")')).toBeVisible();
		});

		test('should display running blog posts', async ({ page }) => {
			await page.goto('/running');
			
			// Check that running posts are displayed
			await expect(page.locator('h3:has-text("Marathon")')).toBeVisible();
			await expect(page.locator('h3:has-text("10K")')).toBeVisible();
			await expect(page.locator('h3:has-text("Shoes")')).toBeVisible();
		});

		test('should display music blog posts', async ({ page }) => {
			await page.goto('/music');
			
			// Check that music posts are displayed
			await expect(page.locator('h3:has-text("Guitar")')).toBeVisible();
			await expect(page.locator('h3:has-text("Jazz")')).toBeVisible();
		});

		test('should display blog post metadata correctly', async ({ page }) => {
			await page.goto('/science');
			
			// Check for category badges
			await expect(page.locator('.bg-blue-100.text-blue-800:has-text("science")')).toBeVisible();
			
			// Check for labels
			await expect(page.locator('.bg-gray-100.text-gray-600:has-text("quantum")')).toBeVisible();
			await expect(page.locator('.bg-gray-100.text-gray-600:has-text("computing")')).toBeVisible();
			
			// Check for dates
			await expect(page.locator('text=2024')).toBeVisible();
		});

		test('should have working read more links', async ({ page }) => {
			await page.goto('/science');
			
			const readMoreLinks = page.locator('a:has-text("Read More")');
			await expect(readMoreLinks).toHaveCount(3); // Should have 3 science posts
			
			// Check that links have proper href attributes
			for (let i = 0; i < 3; i++) {
				const link = readMoreLinks.nth(i);
				await expect(link).toHaveAttribute('href');
			}
		});
	});

	test.describe('Friends Data', () => {
		test('should display friend testimonials on home page', async ({ page }) => {
			await page.goto('/');
			
			// Check for friend names
			await expect(page.locator('h3:has-text("Sarah Johnson")')).toBeVisible();
			await expect(page.locator('h3:has-text("Mike Chen")')).toBeVisible();
			await expect(page.locator('h3:has-text("Emma Davis")')).toBeVisible();
			await expect(page.locator('h3:has-text("David Wilson")')).toBeVisible();
			await expect(page.locator('h3:has-text("Lisa Rodriguez")')).toBeVisible();
		});

		test('should display friend images', async ({ page }) => {
			await page.goto('/');
			
			// Check for friend images
			const friendImages = page.locator('img.w-16.h-16.rounded-full');
			await expect(friendImages).toHaveCount(5); // Should have 5 friends
			
			// Check that images have proper src attributes
			for (let i = 0; i < 5; i++) {
				const img = friendImages.nth(i);
				await expect(img).toHaveAttribute('src');
				await expect(img).toHaveAttribute('alt');
			}
		});

		test('should display friend testimonials', async ({ page }) => {
			await page.goto('/');
			
			// Check for testimonial text
			await expect(page.locator('blockquote:has-text("dedicated runners")')).toBeVisible();
			await expect(page.locator('blockquote:has-text("research projects")')).toBeVisible();
			await expect(page.locator('blockquote:has-text("passion for music")')).toBeVisible();
		});
	});

	test.describe('Running Data', () => {
		test('should display running PBs', async ({ page }) => {
			await page.goto('/running');
			
			// Check for PB distances
			await expect(page.locator('text=5k')).toBeVisible();
			await expect(page.locator('text=10k')).toBeVisible();
			await expect(page.locator('text=HM')).toBeVisible();
			await expect(page.locator('text=M')).toBeVisible();
		});

		test('should display running PB details', async ({ page }) => {
			await page.goto('/running');
			
			// Check for event locations
			await expect(page.locator('text=Central Park')).toBeVisible();
			await expect(page.locator('text=Brooklyn Bridge')).toBeVisible();
			await expect(page.locator('text=NYC Half Marathon')).toBeVisible();
			await expect(page.locator('text=Boston Marathon')).toBeVisible();
		});

		test('should display shoe information', async ({ page }) => {
			await page.goto('/running');
			
			// Check for shoe names
			await expect(page.locator('text=Vaporfly')).toBeVisible();
			await expect(page.locator('text=Adios Pro')).toBeVisible();
		});

		test('should display PB times', async ({ page }) => {
			await page.goto('/running');
			
			// Check for time formats
			await expect(page.locator('text=18:45')).toBeVisible();
			await expect(page.locator('text=39:12')).toBeVisible();
			await expect(page.locator('text=1:28:30')).toBeVisible();
			await expect(page.locator('text=3:15:45')).toBeVisible();
		});
	});

	test.describe('Data Filtering and Sorting', () => {
		test('should filter blog posts by search term', async ({ page }) => {
			await page.goto('/science');
			
			const searchInput = page.locator('input[placeholder="Search posts..."]');
			await searchInput.fill('Quantum');
			
			// Wait for filtering
			await page.waitForTimeout(200);
			
			// Should show only quantum-related posts
			await expect(page.locator('h3:has-text("Quantum")')).toBeVisible();
			await expect(page.locator('h3:has-text("Machine Learning")')).not.toBeVisible();
		});

		test('should filter blog posts by label', async ({ page }) => {
			await page.goto('/science');
			
			const labelSelect = page.locator('select').first();
			await labelSelect.selectOption({ label: 'quantum' });
			
			// Wait for filtering
			await page.waitForTimeout(200);
			
			// Should show only posts with quantum label
			await expect(page.locator('h3:has-text("Quantum")')).toBeVisible();
		});

		test('should sort blog posts by date', async ({ page }) => {
			await page.goto('/science');
			
			// Check that posts are sorted by date (newest first)
			const postTitles = page.locator('h3.text-xl.font-semibold');
			const firstPost = await postTitles.first().textContent();
			const lastPost = await postTitles.last().textContent();
			
			// The newest post should be "Neural Networks Explained" (March 10)
			expect(firstPost).toContain('Neural Networks');
		});

		test('should show correct results count', async ({ page }) => {
			await page.goto('/science');
			
			// Should show 3 science posts initially
			await expect(page.locator('text=Showing 3 of 3 posts')).toBeVisible();
			
			// Filter and check updated count
			const searchInput = page.locator('input[placeholder="Search posts..."]');
			await searchInput.fill('Quantum');
			await page.waitForTimeout(200);
			
			await expect(page.locator('text=Showing 1 of 3 posts')).toBeVisible();
		});
	});

	test.describe('Data Consistency', () => {
		test('should maintain data consistency across pages', async ({ page }) => {
			// Check that the same blog post appears consistently
			await page.goto('/science');
			const quantumPostTitle = await page.locator('h3:has-text("Quantum")').textContent();
			
			await page.goto('/');
			await page.goto('/science');
			const quantumPostTitleAgain = await page.locator('h3:has-text("Quantum")').textContent();
			
			expect(quantumPostTitle).toBe(quantumPostTitleAgain);
		});

		test('should handle empty data gracefully', async ({ page }) => {
			// Test with empty search results
			await page.goto('/science');
			const searchInput = page.locator('input[placeholder="Search posts..."]');
			await searchInput.fill('NonExistentPost');
			await page.waitForTimeout(200);
			
			await expect(page.locator('text=No posts found matching your filters')).toBeVisible();
		});

		test('should display all required data fields', async ({ page }) => {
			await page.goto('/science');
			
			// Check that each blog card has all required elements
			const blogCards = page.locator('.bg-white.rounded-lg.shadow-md');
			const firstCard = blogCards.first();
			
			// Check for title
			await expect(firstCard.locator('h3')).toBeVisible();
			
			// Check for image
			await expect(firstCard.locator('img')).toBeVisible();
			
			// Check for categories
			await expect(firstCard.locator('.bg-blue-100.text-blue-800')).toBeVisible();
			
			// Check for labels
			await expect(firstCard.locator('.bg-gray-100.text-gray-600')).toBeVisible();
			
			// Check for date
			await expect(firstCard.locator('text=2024')).toBeVisible();
			
			// Check for read more link
			await expect(firstCard.locator('a:has-text("Read More")')).toBeVisible();
		});
	});

	test.describe('Performance', () => {
		test('should load data quickly', async ({ page }) => {
			const startTime = Date.now();
			await page.goto('/science');
			const loadTime = Date.now() - startTime;
			
			// Should load within 3 seconds
			expect(loadTime).toBeLessThan(3000);
		});

		test('should handle large datasets efficiently', async ({ page }) => {
			// This test would be more relevant with larger datasets
			// For now, we test that the current dataset loads efficiently
			await page.goto('/science');
			
			// Check that all posts are rendered
			const blogCards = page.locator('.bg-white.rounded-lg.shadow-md');
			await expect(blogCards).toHaveCount(3);
		});
	});
});
