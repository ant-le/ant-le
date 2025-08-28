<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Theme } from '$lib/types';	

	let { children } = $props();
	let currentTheme : Theme = $state('minimal');

	$effect(() => {
		document.documentElement.setAttribute('data-theme', currentTheme);
	});

	export function toggleTheme() {
		currentTheme = currentTheme === 'minimal' ? 'artistic' : 'minimal';

	}


</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="page-layout">
	<Header {toggleTheme} {currentTheme}/>
	<main class="page-main">
		{@render children?.()}
	</main>
	<Footer />
</div>
