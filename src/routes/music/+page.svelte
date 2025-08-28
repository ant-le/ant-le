<script lang="ts">
	import TextCard from '$lib/components/TextCard.svelte';
	import CardRasterHorizontal from '$lib/components/CardRasterHorizontal.svelte';
	import { mockBlogPosts } from '$lib/mockData';
	import { filterBlogPostsByCategory } from '$lib/utils';

	// Get music blog posts
	const musicPosts = filterBlogPostsByCategory(mockBlogPosts, 'music');
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Hero Section -->
	<section class="text-center mb-16">
		<div class="mb-8">
			<!-- Music Icon -->
			<div class="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
				<svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
				</svg>
			</div>
		</div>
		
		<h1 class="text-4xl font-bold text-gray-900 mb-4">
			Music & Inspiration
		</h1>
		<p class="text-xl text-gray-600 max-w-2xl mx-auto">
			Exploring the world through melodies, rhythms, and the stories they tell.
		</p>
	</section>

	<!-- Introduction Section -->
	<section class="mb-16 space-y-8">
		<TextCard 
			text="Music has always been a constant companion in my life. From the classical compositions that help me focus during research to the jazz that accompanies my evening runs, each genre holds a special place in my heart."
			align="center"
		/>
		
		<TextCard 
			text="This section is currently under development. Soon, you'll find my thoughts on favorite albums, musical discoveries, and how music influences my work and daily life."
			align="center"
		/>
	</section>

	<!-- Coming Soon Section -->
	<section class="mb-16">
		<div class="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 rounded-xl p-8 text-center border border-purple-200/50 shadow-lg">
			<h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
				Coming Soon
			</h2>
			<div class="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
				<div>
					<h3 class="font-semibold text-gray-900 mb-2">Album Reviews</h3>
					<p>Deep dives into albums that have shaped my musical journey</p>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900 mb-2">Playlists</h3>
					<p>Curated collections for different moods and activities</p>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900 mb-2">Musical Discoveries</h3>
					<p>New artists and genres that have caught my attention</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Music Blog Posts (if any) -->
	{#if musicPosts.length > 0}
		<section class="mb-16">
			<CardRasterHorizontal 
				items={musicPosts}
				type="blog"
				title="Music Stories"
			/>
		</section>
	{/if}

	<!-- Call to Action -->
	<section class="text-center">
		<TextCard 
			text="Music is a universal language that connects us all. I'd love to hear about your musical discoveries and share recommendations. Let's explore the world of sound together."
			align="center"
		/>
	</section>
</div>
