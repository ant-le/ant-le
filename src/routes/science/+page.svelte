<script lang="ts">
	import TextCard from '$lib/components/TextCard.svelte';
	import CardRasterHorizontal from '$lib/components/CardRasterHorizontal.svelte';
	import CardGridFull from '$lib/components/CardGridFull.svelte';
	import { mockBlogPosts } from '$lib/mockData';
	import { filterBlogPostsByCategory, getRandomBlogPosts } from '$lib/utils';

	// Get science blog posts
	const sciencePosts = filterBlogPostsByCategory(mockBlogPosts, 'science');
	const randomSciencePosts = getRandomBlogPosts(sciencePosts, 3);

	// Scroll state
	let scrollY = $state(0);
	let showAllPosts = $state(false);

	// Handle scroll
	function handleScroll() {
		scrollY = window.scrollY;
		// Show all posts when scrolled down significantly
		showAllPosts = scrollY > 800;
	}

	// Add scroll listener on mount
	$effect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div class="science-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<h1 class="heading-1">
			Science & Research
		</h1>
		<p class="text-body text-center max-w-3xl mx-auto">
			Exploring the frontiers of knowledge through research, innovation, and discovery.
		</p>
	</section>

	<!-- Introduction Section -->
	<section class="intro-section">
		<TextCard 
			text="My research focuses on the intersection of machine learning, quantum computing, and their applications in solving real-world problems. I believe in the power of interdisciplinary approaches to drive innovation."
			align="center"
			variant="highlighted"
		/>
		
		<TextCard 
			text="From developing novel algorithms to exploring the theoretical foundations of artificial intelligence, I'm passionate about pushing the boundaries of what's possible in computational science."
			align="center"
			variant="minimal"
		/>
	</section>

	<!-- Featured Science Posts -->
	<section class="featured-section">
		<CardRasterHorizontal 
			items={randomSciencePosts}
			type="blog"
			title="Featured Research"
		/>
	</section>

	<!-- All Science Posts Grid - Scroll Dependent -->
	<section class="all-posts-section" class:show={showAllPosts}>
		<CardGridFull 
			items={sciencePosts}
			type="blog"
			title="All Research Posts"
			columns={3}
		/>
	</section>

	<!-- Research Areas -->
	<section class="research-areas-section">
		<h2 class="heading-2 text-center">
			Research Areas
		</h2>
		<div class="research-grid">
			<TextCard 
				text="Machine Learning & AI: Developing novel algorithms for pattern recognition, natural language processing, and predictive modeling. My work spans both supervised and unsupervised learning approaches."
				align="left"
				variant="highlighted"
			/>
			<TextCard 
				text="Quantum Computing: Exploring quantum algorithms and their potential applications in cryptography, optimization, and simulation. I'm particularly interested in quantum machine learning and hybrid quantum-classical approaches."
				align="left"
				variant="minimal"
			/>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="cta-section">
		<TextCard 
			text="Interested in collaborating on research projects or discussing the latest developments in AI and quantum computing? I'm always open to new ideas and partnerships."
			align="center"
			variant="default"
		/>
	</section>
</div>

<style>
	.science-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.hero-section {
		text-align: center;
		margin-bottom: 4rem;
		padding-top: 2rem;
	}

	.intro-section {
		margin-bottom: 4rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.featured-section {
		margin-bottom: 4rem;
	}

	.all-posts-section {
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s ease;
	}

	.all-posts-section.show {
		opacity: 1;
		transform: translateY(0);
	}

	.research-areas-section {
		margin-bottom: 4rem;
	}

	.research-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.cta-section {
		text-align: center;
		margin-bottom: 4rem;
	}

	@media (min-width: 768px) {
		.research-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* Artistic theme enhancements */
	:global([data-theme="artistic"]) .science-page {
		animation: pageFadeIn 1s ease-out;
	}

	:global([data-theme="artistic"]) .hero-section {
		animation: heroSlideIn 1.2s ease-out;
	}

	:global([data-theme="artistic"]) .intro-section {
		animation: contentFadeIn 1.5s ease-out;
	}

	:global([data-theme="artistic"]) .featured-section {
		animation: contentFadeIn 1.8s ease-out;
	}

	@keyframes pageFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes heroSlideIn {
		from { 
			opacity: 0; 
			transform: translateY(-30px); 
		}
		to { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}

	@keyframes contentFadeIn {
		from { 
			opacity: 0; 
			transform: translateY(20px); 
		}
		to { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}
</style>
