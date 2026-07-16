<!--
  ScrollDepthTracker — fires an Umami event at 25/50/75/100% scroll depth,
  once per page view, with the reader's active seconds attached:

    umami.track('scroll-depth', { path, depth, seconds })

  Umami derives visit duration from gaps between pageview events, so a long
  single-page read registers as a 0-second bounce — these events are the
  engagement signal instead (at most 4 per read, easy on the event quota).

  Mounted once in the root layout, keyed by pathname. Renders nothing.
  SSR-safe: $effect never runs during prerendering, and window.umami is
  optional-chained in case the tracker script is blocked.
-->
<script>
	let { path } = $props();

	const MILESTONES = [25, 50, 75, 100];
	// A second only counts as reading time while the tab is visible and the
	// reader scrolled, clicked, or typed within this window.
	const ACTIVE_WINDOW_MS = 30_000;

	$effect(() => {
		const currentPath = path; // read synchronously so the effect re-runs per page
		const fired = new Set();
		let activeSeconds = 0;
		let lastActivity = performance.now();

		const markActivity = () => (lastActivity = performance.now());

		const check = () => {
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const depth = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
			for (const m of MILESTONES) {
				if (depth >= m && !fired.has(m)) {
					fired.add(m);
					window.umami?.track('scroll-depth', { path: currentPath, depth: m, seconds: activeSeconds });
				}
			}
		};

		// Milestones fire on scroll only: a reader who never scrolls sends
		// nothing, and a page that fits the viewport sends nothing either.
		const onScroll = () => {
			markActivity();
			check();
		};

		const tick = setInterval(() => {
			if (
				document.visibilityState === 'visible' &&
				performance.now() - lastActivity < ACTIVE_WINDOW_MS
			) {
				activeSeconds += 1;
			}
		}, 1000);

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('pointerdown', markActivity, { passive: true });
		window.addEventListener('keydown', markActivity);

		return () => {
			clearInterval(tick);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('pointerdown', markActivity);
			window.removeEventListener('keydown', markActivity);
		};
	});
</script>
