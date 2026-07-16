<script>
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollDepthTracker from '$lib/components/ScrollDepthTracker.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/state';
	import '$styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<script async defer src="https://cloud.umami.is/script.js" data-website-id="44b340b0-d307-4438-8fb4-4e17f1767354"></script>
</svelte:head>

<Nav />
<ScrollDepthTracker path={page.url.pathname} />

<ModeWatcher defaultMode="light" />

<main id="content" class="page">
	{@render children?.()}
</main>

<Footer />
