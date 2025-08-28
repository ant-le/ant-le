import { describe, it, expect } from 'vitest';
import { mockBlogPosts, mockRunningPBs, mockFriendsData, mockRunningTraining } from './mockData';
import type { BlogCategory, RunningDistance } from './types';

describe('Mock Data', () => {
	describe('mockBlogPosts', () => {
		it('should contain blog posts', () => {
			expect(mockBlogPosts).toBeInstanceOf(Array);
			expect(mockBlogPosts.length).toBeGreaterThan(0);
		});

		it('should have valid blog post structure', () => {
			mockBlogPosts.forEach(post => {
				expect(post.creationDate).toBeInstanceOf(Date);
				expect(typeof post.title).toBe('string');
				expect(typeof post.image).toBe('string');
				expect(Array.isArray(post.labels)).toBe(true);
				expect(typeof post.post).toBe('string');
				expect(Array.isArray(post.categories)).toBe(true);
			});
		});

		it('should have posts in different categories', () => {
			const categories = mockBlogPosts.flatMap(post => post.categories);
			const uniqueCategories = [...new Set(categories)];
			
			expect(uniqueCategories).toContain('science');
			expect(uniqueCategories).toContain('running');
			expect(uniqueCategories).toContain('music');
		});

		it('should have posts with valid categories', () => {
			const validCategories: BlogCategory[] = ['science', 'running', 'music'];
			
			mockBlogPosts.forEach(post => {
				post.categories.forEach(category => {
					expect(validCategories).toContain(category);
				});
			});
		});

		it('should have posts with non-empty titles and images', () => {
			mockBlogPosts.forEach(post => {
				expect(post.title.length).toBeGreaterThan(0);
				expect(post.image.length).toBeGreaterThan(0);
				expect(post.post.length).toBeGreaterThan(0);
			});
		});
	});

	describe('mockRunningPBs', () => {
		it('should contain running PBs', () => {
			expect(mockRunningPBs).toBeInstanceOf(Array);
			expect(mockRunningPBs.length).toBeGreaterThan(0);
		});

		it('should have valid running PB structure', () => {
			mockRunningPBs.forEach(pb => {
				expect(pb.eventDate).toBeInstanceOf(Date);
				expect(typeof pb.eventLocation).toBe('string');
				expect(typeof pb.usedShoe).toBe('string');
				expect(pb.eventLocation.length).toBeGreaterThan(0);
				expect(pb.usedShoe.length).toBeGreaterThan(0);
			});
		});

		it('should have PBs for all distance types', () => {
			const distances = mockRunningPBs.map(pb => pb.distance);
			const validDistances: RunningDistance[] = ['5k', '10k', 'Half Marathon', 'Marathon'];
			
			validDistances.forEach(distance => {
				expect(distances).toContain(distance);
			});
		});

		it('should have valid distance values', () => {
			const validDistances: RunningDistance[] = ['5k', '10k', 'Half Marathon', 'Marathon'];
			
			mockRunningPBs.forEach(pb => {
				expect(validDistances).toContain(pb.distance);
			});
		});

		it('should have time values for PBs', () => {
			mockRunningPBs.forEach(pb => {
				expect(typeof pb.time).toBe('string');
				expect(pb.time!.length).toBeGreaterThan(0);
			});
		});
	});

	describe('mockFriendsData', () => {
		it('should contain friends data', () => {
			expect(mockFriendsData).toBeInstanceOf(Array);
			expect(mockFriendsData.length).toBeGreaterThan(0);
		});

		it('should have valid friends data structure', () => {
			mockFriendsData.forEach(friend => {
				expect(typeof friend.name).toBe('string');
				expect(typeof friend.image).toBe('string');
				expect(typeof friend.text).toBe('string');
				expect(friend.name.length).toBeGreaterThan(0);
				expect(friend.image.length).toBeGreaterThan(0);
				expect(friend.text.length).toBeGreaterThan(0);
			});
		});

		it('should have unique friend names', () => {
			const names = mockFriendsData.map(friend => friend.name);
			const uniqueNames = [...new Set(names)];
			expect(uniqueNames.length).toBe(mockFriendsData.length);
		});
	});

	describe('mockRunningTraining', () => {
		it('should contain training data', () => {
			expect(mockRunningTraining).toBeInstanceOf(Array);
			expect(mockRunningTraining.length).toBeGreaterThan(0);
		});

		it('should have valid training data structure', () => {
			mockRunningTraining.forEach(training => {
				expect(training.date).toBeInstanceOf(Date);
				expect(typeof training.distance).toBe('number');
				expect(training.distance).toBeGreaterThanOrEqual(0);
			});
		});

		it('should have training data for multiple days', () => {
			const uniqueDates = [...new Set(mockRunningTraining.map(t => t.date.toDateString()))];
			expect(uniqueDates.length).toBeGreaterThan(1);
		});

		it('should have some rest days (distance = 0)', () => {
			const restDays = mockRunningTraining.filter(t => t.distance === 0);
			expect(restDays.length).toBeGreaterThan(0);
		});

		it('should have some training days (distance > 0)', () => {
			const trainingDays = mockRunningTraining.filter(t => t.distance > 0);
			expect(trainingDays.length).toBeGreaterThan(0);
		});

		it('should have reasonable distance values', () => {
			mockRunningTraining.forEach(training => {
				expect(training.distance).toBeLessThanOrEqual(50); // Max 50km per day seems reasonable
			});
		});
	});
});
