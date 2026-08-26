<script>
	/**
	 * Reusable, dismissible site-wide announcement bar.
	 *
	 * Mount it at the top of `+layout.svelte` (above <Nav />) when there's
	 * something to announce, e.g.:
	 *
	 *   <AnnouncementBanner id="ic2s2-2026" href="https://ic2s2-2026.org/" external>
	 *     <strong>IC²S² 2026</strong> is coming to Burlington · July 28–31 — learn more →
	 *   </AnnouncementBanner>
	 *
	 * - `id` gives the dismissal a stable localStorage key; change it when the
	 *   message changes so previously-dismissed visitors see the new one.
	 * - It publishes its height as the `--announcement-height` CSS var, which
	 *   Nav.svelte (top) and app.css (.page padding-top) offset by. When no banner
	 *   is mounted the var is unset and those fall back to 0.
	 *
	 * @type {{
	 *   id: string,
	 *   href?: string,
	 *   external?: boolean,
	 *   children: import('svelte').Snippet
	 * }}
	 */
	let { id, href, external = false, children } = $props();
	import { X } from '@lucide/svelte';

	const STORAGE_KEY = `vcsi-announcement-${id}`;
	let visible = $state(true);
	let el = $state();

	function setHeight(px) {
		document.documentElement.style.setProperty('--announcement-height', px);
	}

	$effect(() => {
		if (localStorage.getItem(STORAGE_KEY) === 'dismissed') {
			visible = false;
			setHeight('0px');
			return;
		}
		// Re-measure on resize since the text wraps at narrow widths.
		const measure = () => el && setHeight(`${el.offsetHeight}px`);
		measure();
		window.addEventListener('resize', measure);
		return () => window.removeEventListener('resize', measure);
	});

	function dismiss() {
		visible = false;
		setHeight('0px');
		localStorage.setItem(STORAGE_KEY, 'dismissed');
	}
</script>

{#if visible}
	<div class="announcement" bind:this={el}>
		{#if href}
			<a
				class="announcement-text"
				{href}
				target={external ? '_blank' : undefined}
				rel={external ? 'noopener noreferrer' : undefined}
			>
				{@render children()}
			</a>
		{:else}
			<span class="announcement-text">{@render children()}</span>
		{/if}
		<button class="announcement-close" aria-label="Dismiss announcement" onclick={dismiss}>
			<X size={16} />
		</button>
	</div>
{/if}

<style>
	.announcement {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 150;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 0.5rem 1rem;
		background: var(--color-primary, #1a5632);
		color: #fff;
		font-family: var(--sans);
		font-size: 0.9rem;
		text-align: center;
	}

	.announcement-text {
		color: #fff;
		text-decoration: none;
	}

	a.announcement-text:hover {
		text-decoration: underline;
	}

	.announcement-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		color: #fff;
		cursor: pointer;
		padding: 0.15rem;
		border-radius: 4px;
		opacity: 0.85;
		flex-shrink: 0;
	}

	.announcement-close:hover {
		opacity: 1;
		background: rgba(255, 255, 255, 0.15);
	}
</style>
