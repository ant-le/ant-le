<script lang="ts">
	import TextCard from '$lib/components/TextCard.svelte';
	import CardRasterHorizontal from '$lib/components/CardRasterHorizontal.svelte';
	import TrainingChart from '$lib/components/TrainingChart.svelte';
	import { mockBlogPosts, mockRunningPBs, mockRunningTraining } from '$lib/mockData';
	import { filterBlogPostsByCategory, getSortedRunningPBs, getWeeklyTrainingData } from '$lib/utils';

	// Get running blog posts
	const runningPosts = filterBlogPostsByCategory(mockBlogPosts, 'running');
	const sortedPBs = getSortedRunningPBs(mockRunningPBs);
	const weeklyTraining = getWeeklyTrainingData(mockRunningTraining);
</script>

<div class="container">
	<!-- Hero Section -->
	<section class="text-center mb-16">
		<h1 class="heading-1">
			Running Journey
		</h1>
		<p class="text-body text-center max-w-3xl mx-auto">
			From casual jogs to marathon training, documenting my passion for running and personal growth.
		</p>
	</section>

	<!-- Main Grid Layout -->
	<div class="grid lg:grid-cols-3 gap-8 mb-16">
		<!-- Left Column - Text Content and Blog Posts -->
		<div class="lg:col-span-2 space-y-8">
			<!-- Introduction -->
			<TextCard 
				text="Running has transformed my life in ways I never expected. What started as a simple way to stay fit has become a journey of self-discovery, discipline, and pushing my limits."
				align="left"
				variant="highlighted"
			/>
			
			<!-- Blog Posts -->
			<CardRasterHorizontal 
				items={runningPosts}
				type="blog"
				title="Running Stories"
			/>
			
			<!-- Second Text Block -->
			<TextCard 
				text="Every run teaches me something new—about my body, my mind, and my capacity for growth. Whether it's a 5K tempo run or a long marathon training session, each step brings me closer to understanding my potential."
				align="left"
			/>
		</div>

		<!-- Right Column - Stats and Data -->
		<div class="space-y-8">
			<!-- Personal Bests -->
			<div class="card">
				<h3 class="heading-3">Personal Bests</h3>
				<div class="space-y-3">
					{#each sortedPBs as pb}
						<div class="flex justify-between items-center p-3 bg-neutral-50 rounded border">
							<div>
								<span class="font-bold text-neutral-900">{pb.distance}</span>
								<div class="text-sm text-neutral-600">{pb.eventLocation}</div>
								<div class="text-xs text-neutral-500">{pb.eventDate.toLocaleDateString()}</div>
							</div>
							<div class="text-right">
								<div class="font-bold text-primary">{pb.time}</div>
								<div class="text-xs text-neutral-500">{pb.usedShoe}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Weekly Training Chart -->
			<TrainingChart weeklyData={weeklyTraining} />
		</div>
	</div>

	<!-- Training Philosophy -->
	<section class="mb-16">
		<h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
			Training Philosophy
		</h2>
		<div class="grid md:grid-cols-3 gap-8">
			<TextCard 
				text="Consistency over intensity. Building a sustainable running habit has been more valuable than any single breakthrough performance."
				align="center"
				variant="highlighted"
			/>
			<TextCard 
				text="Listen to your body. Rest days are as important as training days, and recovery is where the real gains happen."
				align="center"
			/>
			<TextCard 
				text="Progress, not perfection. Every run is a step forward, regardless of pace or distance."
				align="center"
				variant="highlighted"
			/>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="text-center">
		<TextCard 
			text="Whether you're just starting your running journey or training for your next race, I'd love to connect with fellow runners and share experiences."
			align="center"
		/>
	</section>
</div>
