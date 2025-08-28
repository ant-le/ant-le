<script lang="ts">
	import TextCard from '$lib/components/TextCard.svelte';
	import CardRasterHorizontal from '$lib/components/CardRasterHorizontal.svelte';
	import { mockFriendsData } from '$lib/mockData';
</script>

<div class="container">
	<!-- Hero Section -->
	<section class="text-center mb-16">
		<h1 class="heading-1">
			Welcome, I'm Anton
		</h1>
		<p class="text-body text-center max-w-2xl mx-auto">
			A passionate scientist, runner, and music enthusiast sharing my journey through life and work.
		</p>
	</section>

	<!-- About Section -->
	<section class="space-y-6 mb-16">
		<TextCard 
			text="I'm a researcher with a deep interest in machine learning and quantum computing. My work focuses on developing innovative solutions that bridge the gap between theoretical concepts and practical applications."
			align="center"
			variant="highlighted"
		/>
		
		<TextCard 
			text="When I'm not in the lab or behind a computer, you'll find me running through the streets and trails. Running has become more than just exercise—it's my meditation, my challenge, and my way of exploring the world."
			align="center"
		/>
		
		<TextCard 
			text="Music is the soundtrack to my life. From classical compositions to modern jazz, I find inspiration and solace in melodies that tell stories and evoke emotions."
			align="center"
			variant="highlighted"
		/>
	</section>

	<!-- Friends References Section -->
	<section class="mb-16">
		<CardRasterHorizontal 
			items={mockFriendsData}
			type="friends"
			title="What Friends Say"
		/>
	</section>

	<!-- Call to Action -->
	<section class="text-center">
		<TextCard 
			text="Explore my work in science, follow my running journey, or discover the music that moves me. Each section offers a different perspective on who I am and what drives me."
			align="center"
		/>
	</section>
</div>
