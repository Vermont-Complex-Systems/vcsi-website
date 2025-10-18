<script>
	import favicon from '$lib/assets/favicon.jpg';
	import Nav from '$lib/components/Nav.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { ModeWatcher } from "mode-watcher";
	import { page } from '$app/stores';
	import "$styles/app.css";

	let { children } = $props();

	let whiteLogoNav = $derived($page.url.pathname === '/events/cnww' || $page.url.pathname === '/events/cnww/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav whiteLogo={whiteLogoNav} />

<ModeWatcher defaultMode="light" />
<main id="content">
	{@render children?.()}
</main>

<Footer />

<style>
	#content {
		flex: 1;
		padding: 5rem 0 5rem; /* Account for fixed nav height */
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	@media (max-width: 768px) {
		#content {
			padding: 6rem 0 3rem; /* Account for fixed nav height */
		}

	}
</style>