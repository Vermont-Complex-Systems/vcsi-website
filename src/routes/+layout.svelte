<script>
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '$styles/app.css';

	let { children } = $props();
</script>


<Nav />

<ModeWatcher defaultMode="light" />

<main id="content" class="page">
	{@render children?.()}
</main>

<Footer />
