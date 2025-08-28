<script lang="ts">
	import type { BlogPost, FriendsData } from '../types';
	import BlogCard from './BlogCard.svelte';
	import FriendsReferences from './FriendsReferences.svelte';
	import { filterBlogPostsByLabel, filterBlogPostsByTitle, sortBlogPostsByDate } from '../utils';

	interface Props {
		items: BlogPost[] | FriendsData[];
		type: 'blog' | 'friends';
		title?: string;
		columns?: number;
		className?: string;
		showFilters?: boolean;
	}

	let { 
		items, 
		type, 
		title, 
		columns = 3, 
		className = '', 
		showFilters = true 
	}: Props = $props();
	
	
	  // Filter and sort state
  let searchTerm = $state('');
  let selectedLabel = $state('');
  let sortBy = $state('date');
	
	// Get unique labels from blog posts
	let uniqueLabels = $derived(() => {
		if (type === 'blog') {
			const allLabels = (items as BlogPost[]).flatMap(post => post.labels);
			return [...new Set(allLabels)];
		}
		return [];
	});
	
	// Filter and sort items
	let filteredItems = $derived(() => {
		if (type === 'blog') {
			let filteredItems = items as BlogPost[];
			
			// Filter by search term
			if (searchTerm) {
				filteredItems = filterBlogPostsByTitle(filteredItems, searchTerm);
			}
			
			// Filter by label
			if (selectedLabel) {
				filteredItems = filterBlogPostsByLabel(filteredItems, selectedLabel);
			}
			
			// Sort items
			if (sortBy === 'date') {
				filteredItems = sortBlogPostsByDate(filteredItems);
			}
			
			return filteredItems;
		}
		return items;
	});

	function handleSearch(event: Event) {
		const target = event.target as HTMLInputElement;
		searchTerm = target.value;
	}

	function handleLabelFilter(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedLabel = target.value;
	}

	function handleSort(event: Event) {
		const target = event.target as HTMLSelectElement;
		sortBy = target.value;
	}

	function clearFilters() {
		searchTerm = '';
		selectedLabel = '';
		sortBy = 'date';
	}
</script>

<div class="{className}">
	{#if title}
		<h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
			{title}
		</h2>
	{/if}
	
	{#if showFilters && type === 'blog'}
		<div class="mb-8 p-4 bg-gray-50 rounded-lg">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Search -->
				<div>
					<label for="search" class="block text-sm font-medium text-gray-700 mb-2">
						Search by title
					</label>
					<input
						id="search"
						type="text"
						placeholder="Search posts..."
						bind:value={searchTerm}
						            oninput={handleSearch}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				
				<!-- Label Filter -->
				<div>
					<label for="label-filter" class="block text-sm font-medium text-gray-700 mb-2">
						Filter by label
					</label>
					<select
						id="label-filter"
						bind:value={selectedLabel}
						            onchange={handleLabelFilter}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">All labels</option>
						{#each uniqueLabels() as label}
							<option value={label}>{label}</option>
						{/each}
					</select>
				</div>
				
				<!-- Sort -->
				<div>
					<label for="sort" class="block text-sm font-medium text-gray-700 mb-2">
						Sort by
					</label>
					<select
						id="sort"
						bind:value={sortBy}
						            onchange={handleSort}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="date">Date (newest first)</option>
						<option value="title">Title (A-Z)</option>
					</select>
				</div>
			</div>
			
			<!-- Clear Filters Button -->
			{#if searchTerm || selectedLabel || sortBy !== 'date'}
				<div class="mt-4 text-center">
					<button
						onclick={clearFilters}
						class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
					>
						Clear all filters
					</button>
				</div>
			{/if}
		</div>
	{/if}
	
	<!-- Results Count -->
	{#if showFilters && type === 'blog'}
		<div class="mb-4 text-sm text-gray-600">
			Showing {filteredItems().length} of {items.length} posts
		</div>
	{/if}
	
	<!-- Grid -->
	{#if filteredItems().length > 0}
		<div class="grid gap-6" style="grid-template-columns: repeat({columns}, 1fr);">
			{#each filteredItems() as item, index}
				{#if type === 'blog'}
					<BlogCard post={item as BlogPost} />
				{:else if type === 'friends'}
					<FriendsReferences friend={item as FriendsData} />
				{/if}
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<div class="text-gray-500 text-lg mb-2">
				{#if searchTerm || selectedLabel}
					No posts found matching your filters
				{:else}
					No posts available
				{/if}
			</div>
			{#if searchTerm || selectedLabel}
				<button
					onclick={clearFilters}
					class="text-blue-600 hover:text-blue-800 underline"
				>
					Clear filters
				</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Responsive grid */
	@media (max-width: 640px) {
		div[style*="grid-template-columns"] {
			grid-template-columns: 1fr !important;
		}
	}
	
	@media (min-width: 641px) and (max-width: 1024px) {
		div[style*="grid-template-columns"] {
			grid-template-columns: repeat(2, 1fr) !important;
		}
	}
</style>
