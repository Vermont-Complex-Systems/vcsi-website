<script>
	import { linkHorizontal } from 'd3';

	/**
	 * Research themes and projects as a bipartite graph: themes in a column on the left, projects
	 * on the right, a curved link from each project to each of its themes. Hovering (or
	 * focusing) a row lights up its neighbours.
	 *
	 * Only layout, links and hover live here: the page draws each theme and project row through
	 * the `theme` and `project` snippets (and, on narrow screens, the title above the projects through `heading`), so they keep
	 * the page's own styles.
	 * Below 860px the links go away: the themes become chips that work like tabs, one always
	 * picked (the first by default), showing that theme's card and only its projects, each still
	 * tagged with all its themes. Listing every project at once made the page far too long.
	 *
	 * @type {{
	 *   themes: { id: string, kicker: string, title: string }[],
	 *   projects: { id: string, themes: string[], title: string }[],
	 *   theme: import('svelte').Snippet<[any]>,
	 *   project: import('svelte').Snippet<[any]>,
	 *   heading?: import('svelte').Snippet<[string]>
	 * }}
	 */
	let { themes, projects, theme: themeCard, project: projectCard, heading } = $props();

	const themeById = $derived(Object.fromEntries(themes.map((t) => [t.id, t])));
	const edges = $derived(projects.flatMap((p) => p.themes.map((t) => ({ p: p.id, t }))));

	// Projects follow the mean position of their themes; themes take whichever order leaves the
	// fewest crossing links (every order is tried: fine for the handful of themes we have)
	const order = $derived.by(() => {
		const sortProjects = (themeIds) => {
			const centre = (p) =>
				p.themes.reduce((sum, id) => sum + themeIds.indexOf(id), 0) / p.themes.length;
			return [...projects].sort((a, b) => centre(a) - centre(b));
		};
		const crossings = (themeIds) => {
			const ps = sortProjects(themeIds).map((p) => p.id);
			const pairs = edges.map((e) => [themeIds.indexOf(e.t), ps.indexOf(e.p)]);
			let count = 0;
			for (const [t1, p1] of pairs) for (const [t2, p2] of pairs) if (t1 < t2 && p1 > p2) count++;
			return count;
		};
		const permutations = (ids) =>
			ids.length <= 1
				? [ids]
				: ids.flatMap((id) => permutations(ids.filter((x) => x !== id)).map((r) => [id, ...r]));

		const best = permutations(themes.map((t) => t.id)).reduce((a, b) =>
			crossings(b) < crossings(a) ? b : a
		);
		return { themes: best.map((id) => themeById[id]), projects: sortProjects(best) };
	});

	/** @type {{ kind: 'theme' | 'project', id: string } | null} */
	let active = $state(null);

	/** Theme picked with the narrow-screen chips */
	let picked = $state(null);
	const filter = $derived(picked ?? order.themes[0].id);

	const touches = (e) => (active?.kind === 'theme' ? e.t === active.id : e.p === active?.id);

	// Keys (`theme:id`, `project:id`) of the active row and its neighbours; null when none is active
	const lit = $derived.by(() => {
		if (!active) return null;
		const keys = new Set([`${active.kind}:${active.id}`]);
		for (const e of edges.filter(touches)) keys.add(`theme:${e.t}`).add(`project:${e.p}`);
		return keys;
	});

	const curve = linkHorizontal();

	/** @type {HTMLDivElement} */
	let root;
	let links = $state([]);

	// Links run between measured row edges, re-measured whenever a row or the whole graph changes
	// size (images loading, text wrapping, window resizing)
	$effect(() => {
		const pairs = edges;

		const measure = () => {
			const box = root.getBoundingClientRect();
			const rects = {};
			for (const el of root.querySelectorAll('[data-node]')) {
				const r = el.getBoundingClientRect();
				rects[el.dataset.node] = {
					x: r.left - box.left,
					y: r.top - box.top,
					w: r.width,
					h: r.height
				};
			}
			links = pairs.map((e) => {
				const t = rects[`theme:${e.t}`];
				const p = rects[`project:${e.p}`];
				const ends = [
					[t.x + t.w, t.y + t.h / 2],
					[p.x, p.y + p.h / 2]
				];
				return { ...e, d: curve({ source: ends[0], target: ends[1] }), ends };
			});
		};

		const observer = new ResizeObserver(measure);
		observer.observe(root);
		root.querySelectorAll('[data-node]').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

{#snippet node(kind, item, card)}
	<div
		class="node"
		class:dim={lit && !lit.has(`${kind}:${item.id}`)}
		class:filtered-out={kind === 'project' && !item.themes.includes(filter)}
		data-node="{kind}:{item.id}"
		role="group"
		aria-label={item.title}
		onmouseenter={() => (active = { kind, id: item.id })}
		onfocusin={() => (active = { kind, id: item.id })}
		onfocusout={() => (active = null)}
	>
		{@render card(item)}
		{#if kind === 'project'}
			<ul class="tags" aria-label="Themes">
				{#each item.themes as id}
					<li>{themeById[id].kicker}</li>
				{/each}
			</ul>
		{/if}
	</div>
{/snippet}

<div class="chips" role="group" aria-label="Filter papers by theme">
	{#each order.themes as item (item.id)}
		<button type="button" aria-pressed={filter === item.id} onclick={() => (picked = item.id)}>
			{item.kicker}
		</button>
	{/each}
</div>
<div class="picked">{@render themeCard(themeById[filter])}</div>

<div class="graph" bind:this={root} onmouseleave={() => (active = null)} role="presentation">
	<svg class="links" aria-hidden="true">
		{#each links as link}
			<path class:on={active && touches(link)} class:dim={active && !touches(link)} d={link.d} />
			{#each link.ends as [cx, cy]}
				<circle class:on={active && touches(link)} {cx} {cy} r="3.5" />
			{/each}
		{/each}
	</svg>

	{#if heading}
		<div class="head">{@render heading('Selected projects')}</div>
	{/if}

	<div class="column themes">
		{#each order.themes as item (item.id)}
			{@render node('theme', item, themeCard)}
		{/each}
	</div>
	<div class="column projects">
		{#each order.projects as item (item.id)}
			{@render node('project', item, projectCard)}
		{/each}
	</div>
</div>

<style>
	.graph {
		position: relative;
		display: grid;
		grid-template-columns: minmax(240px, 1fr) minmax(220px, 1.9fr);
		column-gap: clamp(100px, 14vw, 200px);
		margin-top: 40px;
	}

	.links {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
		pointer-events: none;
	}

	.links path {
		fill: none;
		stroke: var(--ink, #1f1c17);
		stroke-opacity: 0.38;
		stroke-width: 1.4;
		transition:
			stroke 0.2s,
			stroke-opacity 0.2s;
	}

	.links path.on {
		stroke: var(--accent, currentColor);
		stroke-opacity: 1;
		stroke-width: 2;
	}

	.links path.dim {
		stroke-opacity: 0.1;
	}

	.links circle {
		fill: var(--ink, #1f1c17);
		fill-opacity: 0.55;
		transition: fill 0.2s;
	}

	.links circle.on {
		fill: var(--accent, currentColor);
		fill-opacity: 1;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	/* Both columns stretch to the taller one and spread their rows over it, so they start and
	   end together whichever has more to show */
	.themes {
		justify-content: space-around;
	}

	.projects {
		justify-content: space-between;
	}

	.node {
		position: relative;
		z-index: 1;
		transition: opacity 0.2s;
	}

	.dim {
		opacity: 0.35;
	}

	.tags,
	.chips,
	.picked,
	.head {
		display: none;
	}

	@media (max-width: 860px) {
		.graph {
			display: flex;
			flex-direction: column;
			gap: 40px;
		}

		.links,
		.themes,
		.filtered-out {
			display: none;
		}

		.graph {
			gap: 0;
			margin-top: 20px;
		}

		.chips {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
			margin-top: 28px;
		}

		.chips button {
			padding: 6px 14px;
			font: inherit;
			font-size: 12px;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--accent, currentColor);
			background: rgba(255, 252, 244, 0.88);
			border: 1px solid currentColor;
			border-radius: 999px;
			cursor: pointer;
		}

		.chips button[aria-pressed='true'] {
			color: #fff;
			background: var(--accent, currentColor);
			border-color: var(--accent, currentColor);
		}

		.picked,
		.head {
			display: block;
			margin-top: 20px;
		}

		.dim {
			opacity: 1;
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
			margin: 8px 0 0;
			padding: 0;
			list-style: none;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--accent, currentColor);
		}

		.tags li {
			padding: 3px 10px;
			font-size: 11px;
			line-height: 1.4;
			border: 1px solid currentColor;
			border-radius: 999px;
		}
	}
</style>
