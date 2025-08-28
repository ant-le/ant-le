<script lang="ts">
	import type { BlogPost, FriendsData } from '../types';
	import BlogCard from './BlogCard.svelte';
	import FriendsReferences from './FriendsReferences.svelte';

	interface Props {
		items: BlogPost[] | FriendsData[];
		type: 'blog' | 'friends';
		title?: string;
		className?: string;
	}

	let { items, type, title, className = '' }: Props = $props();
	
	let containerRef: HTMLDivElement;
	let currentIndex = $state(0);
  	let itemsPerView = $state(3); // Default, will be calculated based on screen size

	// Calculate how many items to show based on screen size
	function updateItemsPerView() {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 640) itemsPerView = 1; // sm
			else if (window.innerWidth < 1024) itemsPerView = 2; // lg
			else itemsPerView = 3; // xl and up
		}
	}

	function scrollLeft() {
		if (currentIndex > 0) {
			currentIndex = Math.max(0, currentIndex - 1);
			scrollToIndex();
		}
	}

	function scrollRight() {
		const maxIndex = Math.max(0, items.length - itemsPerView);
		if (currentIndex < maxIndex) {
			currentIndex = Math.min(maxIndex, currentIndex + 1);
			scrollToIndex();
		}
	}

	function scrollToIndex() {
		if (containerRef) {
			const cardWidth = containerRef.scrollWidth / items.length;
			containerRef.scrollTo({
				left: currentIndex * cardWidth,
				behavior: 'smooth'
			});
		}
	}

	// Update items per view on mount and resize
	$effect(() => {
		updateItemsPerView();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateItemsPerView);
			return () => window.removeEventListener('resize', updateItemsPerView);
		}
	});

	$effect(() => {
		// Reset index when items change
		currentIndex = 0;
	});
</script>

<div class="relative {className}">
	{#if title}
		<h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
			{title}
		</h2>
	{/if}
	
	<div class="relative flex items-center">
		<!-- Left Navigation Button -->
		<button
			        onclick={scrollLeft}
			class="flex-shrink-0 mr-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 {currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}"
			aria-label="Scroll left"
			disabled={currentIndex === 0}
		>
			<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
			</svg>
		</button>
		
		<!-- Cards Container -->
		<div 
			bind:this={containerRef}
			class="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory flex-1"
			style="scrollbar-width: none; -ms-overflow-style: none;"
		>
			{#each items as item, index}
				<div class="flex-shrink-0 snap-start" style="width: calc((100% - 2rem) / {itemsPerView});">
					{#if type === 'blog'}
						<BlogCard post={item as BlogPost} />
					{:else if type === 'friends'}
						<FriendsReferences friend={item as FriendsData} />
					{/if}
				</div>
			{/each}
		</div>
		
		<!-- Right Navigation Button -->
		<button
			        onclick={scrollRight}
			class="flex-shrink-0 ml-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 {currentIndex >= Math.max(0, items.length - itemsPerView) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}"
			aria-label="Scroll right"
			disabled={currentIndex >= Math.max(0, items.length - itemsPerView)}
		>
			<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
			</svg>
		</button>
	</div>
	
	<!-- Dots Indicator -->
	{#if items.length > itemsPerView}
		<div class="flex justify-center mt-4 space-x-2">
			{#each Array.from({ length: Math.ceil(items.length / itemsPerView) }) as _, index}
				<button
					          onclick={() => { currentIndex = index; scrollToIndex(); }}
					class="w-2 h-2 rounded-full transition-colors duration-200 {currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}"
					aria-label="Go to slide {index + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
